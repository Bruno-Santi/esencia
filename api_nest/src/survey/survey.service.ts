import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Member } from 'src/members/entities/member.entity';
import { Model, Types } from 'mongoose';
import axios from 'axios';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { JwtService } from '@nestjs/jwt';
import { sendMail } from 'common/utils/emailData';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { Survey } from './entities/survey.entity';
import { TeamService } from 'src/team/team.service';

import { Team } from 'src/team/entities/team.entity';
import { DaySurvey } from './entities/daySurvey.entity';
@Injectable()
export class SurveyService {
  constructor(
    @InjectModel(Member.name) private readonly memberModel: Model<Member>,
    @InjectModel(Survey.name) private readonly surveyModel: Model<Survey>,
    @InjectModel(Team.name) private readonly teamModel: Model<any>,
    @InjectModel(DaySurvey.name)
    private readonly dailySurveyModel: Model<any>,
    @InjectSendGrid() private readonly client: SendGridService,
    private readonly jwtService: JwtService,
    private readonly teamService: TeamService,
  ) {}

  async createNewSurvey(teamId) {
    const convertedTeamId = new Types.ObjectId(teamId);
    const members = await this.memberModel.find({ teamId: convertedTeamId });
    const team = await this.teamService.searchTeam(convertedTeamId);
    console.log(team);

    try {
      for (const member of members) {
        const token = this.jwtService.sign(
          { sub: member._id },
          { secret: process.env.JWT_SECRET_KEY },
        );
        const convertedUserId = new Types.ObjectId(member._id);
        const emailData = await sendMail(
          token,
          teamId,
          member.name,
          member.email,
          convertedUserId,
          team.name,
        );
        await this.client.send(emailData);
      }
      return {
        payload: `Survey sent to ${teamId} successfully`,
      };
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }

  async postSurvey(createSurveyDto: CreateSurveyDto) {
    const convertedTeamId = new Types.ObjectId(createSurveyDto.team_id);
    const convertedUserId = new Types.ObjectId(createSurveyDto.user_id);
    try {
      const team = await this.teamService.searchTeam(convertedTeamId);
      console.log(team.sprint);

      const data = {
        ...createSurveyDto,
        sprint: team.sprint,
      };
      if (!team)
        throw new BadRequestException(
          `The team ${createSurveyDto.team_id} does not exist`,
        );
      const resp = await axios.post(
        process.env.API_DATA + '/daily_survey',
        data,
      );

      console.log(team.sprint);

      // await axios.post(
      //   `${process.env.API_DATA}/short_recommendation?team_id=${createSurveyDto.team_id}`,
      // );
      await this.surveyModel.create({
        ...createSurveyDto,
        userId: convertedUserId,
        teamId: convertedTeamId,
        date: new Date(),
        sprint: team.sprint,
      });
      console.log(resp);

      return {
        created: 'ok',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async checkSurvey(teamId, userId) {
    console.log(teamId, userId);

    const currentDate = new Date();
    console.log(currentDate);
    const startOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );
    const endOfDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
    );

    try {
      const survey = await this.surveyModel.findOne({
        team_id: teamId,
        user_id: userId,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });
      if (!survey) {
        return {
          survey: 'not found',
        };
      }
      return {
        survey: 'found',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
  async createNewSurveyAndDailySurvey(createDailySurveyDto) {
    try {
      console.log(createDailySurveyDto);
      await this.createNewSurvey(createDailySurveyDto.team_id);

      return {
        created: 'ok',
        payload: `Survey sent to ${createDailySurveyDto.teamId} successfully, and daily survey created.`,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    } finally {
      await this.createNewDaySurvey(createDailySurveyDto);
    }
  }

  async createNewDaySurvey(createDailySurveyDto) {
    const convertedTeamId = new Types.ObjectId(createDailySurveyDto.team_id);

    try {
      const team = await this.teamService.searchTeam(convertedTeamId);

      if (!team) {
        throw new BadRequestException(
          `The team ${createDailySurveyDto.team_id} does not exist`,
        );
      }

      const currentDate = new Date();
      const startOfDay = this.getStartOfDay(currentDate);
      const endOfDay = this.getEndOfDay(currentDate);

      const surveyExist = await this.dailySurveyModel.findOne({
        team_id: convertedTeamId,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });

      if (surveyExist) {
        return {
          message: `Daily survey for team ${createDailySurveyDto.team_id} already exists`,
        };
      }

      const questions = createDailySurveyDto.questions.map((question) => ({
        id: question.id,
        content: question.question,
        cuadrant_cohef: question.cuadrant_cohef,
      }));

      const data = {
        team_id: convertedTeamId,
        date: currentDate,
        questions: questions,
      };
      console.log(data);
      await this.dailySurveyModel.create(data);

      return {
        created: 'ok',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getDailySurvey(teamId) {
    try {
      const currentDate = new Date();
      const startOfDay = this.getStartOfDay(currentDate);
      const endOfDay = this.getEndOfDay(currentDate);

      const dailySurvey = await this.dailySurveyModel.findOne({
        team_id: teamId,
        date: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });

      if (!dailySurvey) {
        throw new NotFoundException(
          `Daily survey not found for team ${teamId} on date ${currentDate}`,
        );
      }

      return dailySurvey;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
  getStartOfDay(date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    return startOfDay;
  }

  getEndOfDay(date: Date) {
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    return endOfDay;
  }
}
