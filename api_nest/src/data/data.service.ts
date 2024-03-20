import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model, Types } from 'mongoose';
import { MembersService } from 'src/members/members.service';
import { Team } from 'src/team/entities/team.entity';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<Team>,
    private readonly membersService: MembersService,
  ) {}
  async getReports(teamId, sprint) {
    try {
      await this.checkTeam(teamId);
      const { data } = await axios.get(
        `${process.env.API_DATA}/get_reports?team_id=${teamId}`,
      );

      // const topics = await axios.get(
      //   `${process.env.API_DATA}/trending_topics?sprint=${sprint}&team_id${teamId}`,
      // );
      const modifiedData = data.map((report) => {
        const { $oid: id } = report._id;

        delete report._id;
        return {
          ...report,
          id,
        };
      });

      console.log(modifiedData);

      return {
        data: modifiedData,
        // topics: topics,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async getDashboardData(teamId, sprint, members) {
    try {
      console.log(teamId, sprint);
      console.log(members);

      await this.checkTeam(teamId);

      const short = await axios.post(
        `${process.env.API_DATA}/short_recommendation?team_id=${teamId}&sprint=${sprint}&members=${members}`,
      );
      console.log(short);

      const data2 = await axios.post(
        `${process.env.API_DATA}/get_topics?sprint=${sprint}&team_id=${teamId}`,
      );
      console.log(data2);
      const dashboardData = await axios.get(
        `${process.env.API_DATA}/dashboard_data?sprint=${sprint}&team_id=${teamId}`,
      );

      console.log(data2);
      console.log(short);

      const responseData = {
        data: dashboardData.data,
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
