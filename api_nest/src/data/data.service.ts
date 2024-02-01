import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model, Types } from 'mongoose';
import { Team } from 'src/team/entities/team.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
  ) {}
  async getLongRecommendation(teamId) {
    try {
      const team = await this.checkTeam(teamId);
      // const postRecommendation = await axios.post(
      //   `${process.env.API_DATA}/report?team_id=${teamId}&sprint=${team?.sprint}`,
      // );
      const longRecommendation = await axios.get(
        `${process.env.API_DATA}/get_long_recommendation?team_id=${teamId}`,
      );
      const { data } = longRecommendation;
      return {
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getDashboardData(teamId, sprint) {
    try {
      console.log(teamId, sprint);

      await this.checkTeam(teamId);

      const short = await axios.post(
        `${process.env.API_DATA}/short_recommendation?team_id=${teamId}&sprint=${sprint}`,
      );
      const data2 = await axios.post(
        `${process.env.API_DATA}/get_topics?sprint=${sprint}&team_id=${teamId}`,
      );
      const dashboardData = await axios.get(
        `${process.env.API_DATA}/dashboard_data?sprint=${sprint}&team_id=${teamId}`,
      );
      const longRecommendation = await axios.post(
        `${process.env.API_DATA}/report?team_id=${teamId}&sprint=${sprint == 0 ? 1 : sprint}`,
      );

      console.log(data2);
      console.log(short);
      console.log(longRecommendation);

      const responseData = {
        data: dashboardData.data,
        longRecommendation: longRecommendation.data,
      };

      console.log(responseData);

      return responseData;
    } catch (error) {
      console.log(error);

      throw new BadRequestException(error.message);
    }
  }

  async checkTeam(teamId) {
    const convertedTeamId = new Types.ObjectId(teamId);
    try {
      const team = await this.teamModel.findById(convertedTeamId);
      if (!team) throw new BadRequestException(`Team ${teamId} does not exist`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
