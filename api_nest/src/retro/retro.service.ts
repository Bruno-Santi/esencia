import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Model, Types } from 'mongoose';

import { TeamService } from 'src/team/team.service';
import { JwtService } from '@nestjs/jwt';
import { sendRetroMail } from 'common/utils/emailRetro';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { MembersService } from 'src/members/members.service';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'src/members/entities/member.entity';

interface Vote {
  user_id: string;
  value: 'thumb_up' | 'thumb_down';
}

interface StickyNote {
  user_id: string;
  team_id: string;
  column: string;
  value: string;
  thumb_up: number;
  thumb_down: number;
  votes: { user_id: string; value: string }[];
}

@Injectable({ scope: Scope.DEFAULT })
export class RetroService {
  private connectedClients: Map<Socket, string> = new Map();
  private stickyNotes: Map<string, Map<string, StickyNote[]>> = new Map();

  constructor(
    private readonly teamService: TeamService,
    private readonly memberService: MembersService,
    private readonly jwtService: JwtService,
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    @InjectSendGrid() private readonly sendGrid: SendGridService,
  ) {}

  async registerClient(client: Socket, user_id: string) {
    this.connectedClients.set(client, user_id);
  }

  removeClient(client: Socket) {
    this.connectedClients.delete(client);
  }

  isClientRegistered(client: Socket): boolean {
    return this.connectedClients.has(client);
  }

  getConnectedClients(): number {
    return this.connectedClients.size;
  }

  getClientUserId(client: Socket) {
    return this.connectedClients.get(client);
  }

  async rateStickyNote(
    user_id: string,
    team_id: string,
    column: string,
    vote: string,
    value: string,
  ) {
    const stickyNote =
      this.findStickyNote(user_id, team_id, column, value) ||
      this.createStickyNote(user_id, team_id, column, value);

    const existingVoteIndex = stickyNote.votes.findIndex(
      (v) => v.user_id === user_id,
    );

    if (existingVoteIndex !== -1) {
      const existingVote = stickyNote.votes[existingVoteIndex];

      stickyNote.votes.splice(existingVoteIndex, 1);

      if (existingVote.value === 'thumb_up') {
        stickyNote.thumb_up = Math.max(0, stickyNote.thumb_up - 1);
      } else if (existingVote.value === 'thumb_down') {
        stickyNote.thumb_down = Math.max(0, stickyNote.thumb_down - 1);
      }
    }

    stickyNote.votes.push({
      user_id,
      value: vote as 'thumb_up' | 'thumb_down',
    });

    if (vote === 'thumb_up') {
      stickyNote.thumb_up += 1;
    } else if (vote === 'thumb_down') {
      stickyNote.thumb_down += 1;
    }

    console.log(this.stickyNotes);
    return stickyNote;
  }

  saveStickyNote(
    user_id: string,
    team_id: string,
    column: string,
    value: string,
  ) {
    const newStickyNote: StickyNote = {
      user_id,
      team_id,
      column,
      value,
      thumb_up: 0,
      thumb_down: 0,
      votes: [],
    };

    this.updateStickyNotesInMemory(team_id, column, newStickyNote);
    return { message: 'Sticky note saved successfully' };
  }

  getAllStickyNotes(team_id: string) {
    const stickyNotesMap = this.stickyNotes.get(team_id);
    const allStickyNotes: StickyNote[] = [];

    if (stickyNotesMap) {
      stickyNotesMap.forEach((notes, column) => {
        allStickyNotes.push(...notes);
      });
    }

    return allStickyNotes;
  }

  completeRetroAndSendStickyNotes(team_id: string) {
    const stickyNotesMap = this.stickyNotes.get(team_id);

    if (stickyNotesMap) {
      stickyNotesMap.forEach((notes, column) => {
        notes.length = 0;
      });
    }
    console.log(stickyNotesMap);
  }

  private updateStickyNotesInMemory(
    team_id: string,
    column: string,
    newStickyNote: StickyNote,
  ) {
    if (!this.stickyNotes.has(team_id)) {
      this.stickyNotes.set(team_id, new Map());
    }

    const teamNotesMap = this.stickyNotes.get(team_id);

    if (!teamNotesMap.has(column)) {
      teamNotesMap.set(column, []);
    }

    const columnNotes = teamNotesMap.get(column);
    columnNotes.push(newStickyNote);
  }

  private findStickyNote(
    user_id: string,
    team_id: string,
    column: string,
    value: string,
  ): StickyNote | undefined {
    const stickyNotesMap = this.stickyNotes.get(team_id);

    if (stickyNotesMap && stickyNotesMap.has(column)) {
      const columnNotes = stickyNotesMap.get(column);
      return columnNotes.find(
        (note) => note.value === value && note.column === column,
      );
    }

    return undefined;
  }

  isValidTeamId = (team_id) => {
    return Types.ObjectId.isValid(team_id);
  };

  async sendEmailToMembers(teamId) {
    console.log({ este: teamId });

    this.isValidTeamId(teamId);
    try {
      const teams = await this.teamService.searchTeam(teamId);

      if (teams) {
        console.log(teams);

        const convertedTeamId = new Types.ObjectId(teamId);
        const members = await this.memberModel.find({
          teamId: convertedTeamId,
        });
        console.log(members);

        if (members) {
          for (const member of members) {
            const token = this.jwtService.sign(
              { sub: member._id },
              { secret: process.env.JWT_SECRET_KEY },
            );
            const convertedUserId = new Types.ObjectId(member._id);
            const emailData = await sendRetroMail(
              token,
              teamId,
              member.name,
              member.email,
              convertedUserId,
            );

            await this.sendGrid.send(emailData);
          }
        }
      }
      return {
        message: `Retro sent to team: ${teamId}`,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getTeamLength(teamId) {
    console.log(teamId);
    const convertedTeamId = new Types.ObjectId(teamId);
    const teams = await this.teamService.searchTeam(convertedTeamId);
    return Object.keys(teams).length;
  }
  async getTeamIdByUserId(user_id) {
    try {
      const convertedUserId = new Types.ObjectId(user_id);
      const member = await this.memberModel.findById(convertedUserId);

      if (member) {
        const { teamId } = member;
        return teamId;
      } else {
        throw new Error(`Member not found for user_id: ${user_id}`);
      }
    } catch (error) {
      console.error(`Error getting teamId by userId: ${error.message}`);
      throw error;
    }
  }

  async getUserById(user_id: string) {
    console.log(user_id);

    if (user_id && user_id !== null) {
      try {
        const convertedUserId = new Types.ObjectId(user_id);
        const member = await this.memberModel.findById(convertedUserId);
        return member;
      } catch (error) {
        console.log(error);
      }
    }
    return;
  }

  async deleteStickyNoteByContent(
    user_id: string,
    team_id: string,
    noteContent: string,
  ) {
    try {
      if (!this.isValidTeamId(team_id)) {
        throw new BadRequestException('Invalid teamId');
      }

      const stickyNotesMap = this.stickyNotes.get(team_id);

      if (stickyNotesMap) {
        stickyNotesMap.forEach((notes, column) => {
          const indexToDelete = notes.findIndex(
            (note) => note.value === noteContent && note.user_id === user_id,
          );

          if (indexToDelete !== -1) {
            notes.splice(indexToDelete, 1);
          }
        });
      }
    } catch (error) {
      console.error('Error deleting sticky note by content:', error);
      throw error;
    }
  }

  private createStickyNote(
    user_id: string,
    team_id: string,
    column: string,
    value: string,
  ): StickyNote {
    const newStickyNote: StickyNote = {
      user_id,
      team_id,
      column,
      value,
      thumb_up: 0,
      thumb_down: 0,
      votes: [],
    };

    this.updateStickyNotesInMemory(team_id, column, newStickyNote);
    return newStickyNote;
  }
}
