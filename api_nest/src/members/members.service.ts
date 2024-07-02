import { BadRequestException, Injectable } from '@nestjs/common';
import { TeamService } from 'src/team/team.service';
import { CreateMemberDto } from './dto/create-member.dto';

import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { sendLoginEmail } from 'common/utils/sendRegistrationEmail';
import { sendInvitationTeam } from 'common/utils/sendInvitationTeam';
import { JwtService } from '@nestjs/jwt';
import { Team } from 'src/team/entities/team.entity';
import { User } from 'src/auth/entities/user.entity';
import * as bcrypt from 'bcrypt';
import generatePassword from 'common/utils/generateMemberPassword';
@Injectable()
export class MembersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
    @InjectSendGrid() private readonly client: SendGridService,
    private readonly jwtService: JwtService,
    private readonly teamService: TeamService,
  ) {}
  async create(createMemberDto: CreateMemberDto) {
    try {
      const convertedTeamId = new Types.ObjectId(createMemberDto.teamId);

      const team = await this.teamModel.findById(convertedTeamId);
      if (!team) {
        throw new BadRequestException(
          `Team ${createMemberDto.teamId} not found`,
        );
      }

      let user = await this.userModel.findOne({ email: createMemberDto.email });

      if (!user) {
        user = await this.userModel.create({
          name: createMemberDto.name,
          email: createMemberDto.email,
          avtColor: createMemberDto.avtColor,
          isRegistered: false,
        });
      }

      const existingMember = team.members.find(
        (member) => String(member.id) === String(user._id),
      );
      if (existingMember) {
        throw new BadRequestException(
          `Member ${createMemberDto.email} already exists in team`,
        );
      }

      team.members.push({ id: user._id, role: 'member' });
      const emailData = this.sendTeamAddEmail(user.email, user.name, team.name);
      await this.client.send(emailData);
      await team.save();

      return {
        created: 'ok',
        newMember: user.toObject(),
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTeamMembers(teamId: string) {
    try {
      const convertedTeamId = new Types.ObjectId(teamId);

      const team = await this.teamModel.findById(convertedTeamId).lean();
      if (!team) {
        throw new BadRequestException(`The team ${teamId} doesn't exist`);
      }

      const memberIds = team.members.map((member) => member.id);

      const users = await this.userModel
        .find({ _id: { $in: memberIds.map((id) => new Types.ObjectId(id)) } })
        .select('name email avtColor isRegistered');

      const members = users.map((user) => ({
        ...user.toObject(),
        role:
          team.members.find((member) => member.id === String(user._id))?.role ||
          null,
      }));

      console.log(members);

      return {
        members,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async deleteTeamMember(memberId: string) {
    const convertedMemberId = new Types.ObjectId(memberId);

    try {
      // Encuentra el equipo que contiene al miembro
      const team = await this.teamModel.findOne({
        'members.id': convertedMemberId,
      });

      if (!team) {
        throw new BadRequestException(
          `Member ${memberId} not found in any team`,
        );
      }

      // Elimina al miembro del equipo
      team.members = team.members.filter(
        (member) => String(member.id) !== String(convertedMemberId),
      );

      await team.save();

      return { deleted: 'ok' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async inviteMember(memberId: string, teamId) {
    try {
      const randomPassword = generatePassword();
      console.log(randomPassword);

      const member = await this.userModel.findById(memberId);

      // Verificar si el miembro y el equipo existen
      console.log(teamId.teamId);

      const team = await this.teamService.searchTeam(teamId.teamId);
      if (!team) {
        throw new BadRequestException(`Team with ID ${teamId} does not exist.`);
      }
      if (!member) {
        throw new BadRequestException(
          `Member with ID ${memberId} does not exist.`,
        );
      }

      if (member.isRegistered) {
        throw new BadRequestException(
          `Member with ID ${memberId} is already registered.`,
        );
      }

      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      member.password = hashedPassword;
      member.isRegistered = true;
      member.firstLoggin = false;
      member.emailVerified = true;
      await member.save();

      const emailData = this.sendInvitationEmail(member, randomPassword, team);
      await this.client.send(emailData);

      console.log(
        `Member with ID ${memberId} has been successfully registered.`,
      );

      return {
        message: `Member with ID ${memberId} has been successfully registered.`,
      };
    } catch (error) {
      console.error('Error inviting member:', error);
      throw new BadRequestException(error.message);
    }
  }

  sendInvitationEmail(member, memberPassword, team) {
    const emailData = sendLoginEmail(
      member.name,
      member.email,
      memberPassword,
      team.name,
    );
    return emailData;
  }
  sendTeamAddEmail(memberEmail, memberName, teamName) {
    const emailData = sendInvitationTeam(memberEmail, teamName, memberName);
    return emailData;
  }
  // async deleteTeamMembers(teamId) {
  //   const convertedTeamId = new Types.ObjectId(teamId);

  //   const members = await this.memberModel.deleteMany({
  //     teamId: convertedTeamId,
  //   });
  //   return {
  //     deleted: 'ok',
  //     members: members.deletedCount,
  //   };
  // }

  // async getMemberTeam(memberId) {
  //   try {
  //     const member = await this.memberModel.findOne({ _id: memberId });

  //     if (member) {
  //       const teamId = member.teamId;
  //       const team = await this.teamService.findOne(teamId);
  //       return [team];
  //     } else {
  //       console.log('no se pudo');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  // async login(email: string, password: string) {
  //   console.log(email, password);

  //   try {
  //     const members = await this.memberModel.find({ email });

  //     if (members.length === 0) {
  //       throw new BadRequestException('Credenciales inválidas');
  //     }

  //     const member = members.find((member) => member.password === password);

  //     if (!member) {
  //       throw new BadRequestException('Credenciales inválidas');
  //     }

  //     const team = await this.getMemberTeam(member.teamId);
  //     const token = this.jwtService.sign(
  //       { sub: member._id },
  //       { secret: process.env.JWT_SECRET_KEY },
  //     );

  //     return {
  //       token: token,
  //       user: {
  //         id: member._id,
  //         name: member.name,
  //         email: member.email,
  //         avtColor: member.avtColor,
  //       },
  //       teams: team,
  //     };
  //   } catch (error) {
  //     throw new BadRequestException('Invalid credentials');
  //   }
  // }
}
