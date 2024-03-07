import { BadRequestException, Injectable } from '@nestjs/common';
import { TeamService } from 'src/team/team.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { convertStringToObj } from 'common/utils/converStringToObj';
import generatePassword from '../../common/utils/generateMemberPassword';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { sendLoginEmail } from 'common/utils/sendRegistrationEmail';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    @InjectSendGrid() private readonly client: SendGridService,
    private readonly jwtService: JwtService,
    private readonly teamService: TeamService,
  ) {}
  async create(createMemberDto: CreateMemberDto) {
    try {
      const convertedScrumId = new Types.ObjectId(createMemberDto.teamId);
      await this.teamService.searchTeam(convertedScrumId);
      const member = await this.memberModel.find({
        email: createMemberDto.email,
        teamId: convertedScrumId,
      });
      if (member.length > 0)
        throw new BadRequestException(
          `Member ${createMemberDto.email} already exists`,
        );
      await this.memberModel.create({
        ...createMemberDto,
        teamId: convertedScrumId,
      });
      return {
        created: 'ok',
        newMember: createMemberDto,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTeamMembers(teamId) {
    try {
      const convertedTeamId = new Types.ObjectId(teamId);
      if (!convertedTeamId)
        throw new BadRequestException(`The team ${teamId} doesn't exist`);
      const members = await this.memberModel
        .find({ teamId: convertedTeamId })
        .select('name email avtColor isRegistered');
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
      const member = await this.memberModel.findOneAndDelete(convertedMemberId);
      if (!member)
        throw new BadRequestException(`The member ${memberId} doesn't exist`);
      return { deleted: 'ok' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteTeamMembers(teamId) {
    const convertedTeamId = new Types.ObjectId(teamId);

    const members = await this.memberModel.deleteMany({
      teamId: convertedTeamId,
    });
    return {
      deleted: 'ok',
      members: members.deletedCount,
    };
  }

  async inviteMember(memberId, teamId) {
    try {
      const randomPassword = generatePassword();
      console.log(randomPassword);
      console.log(teamId.teamId);

      const member = await this.memberModel.findById(memberId);
      const team = await this.teamService.findOne(teamId.teamId);
      if (!team)
        throw new BadRequestException(
          `El team con el id: ${teamId} no existe.`,
        );
      if (!member)
        throw new BadRequestException(
          `El miembro con el id: ${memberId} no existe`,
        );
      if (member.isRegistered)
        throw new BadRequestException(
          `El miembro con el id: ${memberId} ya se encuentra registrado`,
        );

      member.password = randomPassword;
      member.isRegistered = true;
      await member.save();
      const emailData = this.sendInvitationEmail(member, member.password, team);
      await this.client.send(emailData);
      console.log(
        `El miembro con el id: ${memberId} ha sido registrado exitosamente.`,
      );
    } catch (error) {
      console.log(error);
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

  async getMemberTeam(memberId) {
    try {
      const member = await this.memberModel.findOne({ _id: memberId });

      if (member) {
        const teamId = member.teamId;
        const team = await this.teamService.findOne(teamId);
        return [team];
      } else {
        console.log('no se pudo');
      }
    } catch (error) {
      console.log(error);
    }
  }
  async login(email: string, password: string) {
    console.log(email, password);

    try {
      const members = await this.memberModel.find({ email });

      if (members.length === 0) {
        throw new BadRequestException('Credenciales inválidas');
      }

      const member = members.find((member) => member.password === password);

      if (!member) {
        throw new BadRequestException('Credenciales inválidas');
      }

      const team = await this.getMemberTeam(member.teamId);
      const token = this.jwtService.sign(
        { sub: member._id },
        { secret: process.env.JWT_SECRET_KEY },
      );

      return {
        token: token,
        user: {
          id: member._id,
          name: member.name,
          email: member.email,
          avtColor: member.avtColor,
        },
        teams: team,
      };
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
