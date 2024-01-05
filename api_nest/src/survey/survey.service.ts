import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'src/members/entities/member.entity';
import { Model, Types } from 'mongoose';

import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from 'common/utils/emailData';
@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    @InjectSendGrid() private readonly client: SendGridService,
    private readonly jwtService: JwtService,
  ) {}

  async createNewSurvey(teamId) {
    const convertedTeamId = new Types.ObjectId(teamId);
    const members = await this.memberModel.find({ teamId: convertedTeamId });

    try {
      for (const member of members) {
        const token = this.jwtService.sign(
          { sub: member._id },
          { secret: process.env.JWT_SECRET_KEY },
        );
        const emailData = await sendMail(
          token,
          teamId,
          member.name,
          member.email,
        );
        await this.client.send(emailData);
      }
      return {
        payload: `Survey sent to ${teamId} successfully`,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
