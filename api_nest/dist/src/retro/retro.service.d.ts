/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Socket } from 'socket.io';
import { Model, Types } from 'mongoose';
import { TeamService } from 'src/team/team.service';
import { JwtService } from '@nestjs/jwt';
import { SendGridService } from '@ntegral/nestjs-sendgrid';
import { MembersService } from 'src/members/members.service';
import { Member } from 'src/members/entities/member.entity';
import { MailerService } from '@nestjs-modules/mailer';
type StickyNote = {
    user_id: string;
    team_id: string;
    column: string;
    value: string;
    thumb_up: number;
    thumb_down: number;
    votes: any[];
};
export declare class RetroService {
    private readonly mailerService;
    private readonly teamService;
    private readonly memberService;
    private readonly jwtService;
    private readonly memberModel;
    private readonly teamModel;
    private readonly sendGrid;
    private connectedClients;
    private stickyNotes;
    private retros;
    private scrumMasterTeamMap;
    private retroStartedTeams;
    constructor(mailerService: MailerService, teamService: TeamService, memberService: MembersService, jwtService: JwtService, memberModel: Model<Member>, teamModel: Model<Member>, sendGrid: SendGridService);
    registerClient(client: Socket, user_id: string): Promise<void>;
    removeClient(client: Socket): void;
    getStickyNote(user_id: string, team_id: string, column: string, value: string): Promise<StickyNote | undefined>;
    isClientRegistered(client: Socket): boolean;
    getConnectedClients(): number;
    getClients(): Map<string, string>;
    getClientUserId(client: Socket): string;
    startRetro(teamId: string): void;
    completeRetro(teamId: string): Promise<void>;
    isRetroStarted(teamId: string): boolean;
    createRetro(data: any): Promise<string>;
    clearTeamIdForRetro(team_id: string): void;
    rateStickyNote(user_id: string, team_id: string, column: string, vote: string, value: string): Promise<StickyNote>;
    saveStickyNote(user_id: string, team_id: string, column: string, value: string): {
        message: string;
    };
    getAllStickyNotes(team_id: string): StickyNote[];
    completeRetroAndSendStickyNotes(team_id: string): Promise<void>;
    private updateStickyNotesInMemory;
    private findStickyNote;
    isValidTeamId: (team_id: any) => boolean;
    sendEmailToMembers(teamId: any): Promise<{
        message: string;
    }>;
    getTeamLength(teamId: any): Promise<number>;
    getTeamIdByUserId(user_id: any): Promise<Types.ObjectId>;
    getUserById(user_id: string): Promise<import("mongoose").Document<unknown, {}, Member> & Member & {
        _id: Types.ObjectId;
    }>;
    deleteStickyNoteByContent(user_id: string, team_id: string, noteContent: string): Promise<void>;
    private createStickyNote;
}
export {};
