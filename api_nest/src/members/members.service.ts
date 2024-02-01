import { BadRequestException, Injectable } from '@nestjs/common';
import { TeamService } from 'src/team/team.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { Member } from './entities/member.entity';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MembersService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,

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
        .select('name email');

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
}
