import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Team } from './entities/team.entity';
import { AuthService } from 'src/auth/auth.service';
import { convertStringToObj } from '../../common/utils/converStringToObj';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async create(createTeamDto: CreateTeamDto, scrumId) {
    try {
      await this.searchScrumMaster(scrumId);
      const existingTeam = await this.teamModel.findOne({
        name: createTeamDto.name,
        scrumId: scrumId,
      });

      if (existingTeam) {
        throw new BadRequestException(
          `Team ${createTeamDto.name} already exists`,
        );
      }
      console.log(createTeamDto.logo);

      const team = await this.teamModel.create({
        ...createTeamDto,
        scrumId: scrumId,
        logo: createTeamDto.logo,
      });

      return team;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteOne(teamId) {
    const convertedTeam = convertStringToObj(teamId);
    try {
      const team = await this.teamModel.findById(teamId);
      if (!team) throw new BadRequestException('El equipo no existe');
      await this.teamModel.deleteOne(convertedTeam);
      return {
        deleted: 'ok',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }
  async findAllTeams(scrumId) {
    try {
      await this.searchScrumMaster(scrumId);
      const teams = await this.teamModel.find({ scrumId: scrumId });

      return teams;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  searchScrumMaster = async (scrumId) => {
    const user = await this.authService.findScrumMaster(scrumId);

    if (!user) throw new BadRequestException(`User ${scrumId} doesn't exist`);
  };
  searchTeam = async (teamId) => {
    console.log(teamId);

    const team = await this.teamModel.findOne({ _id: teamId });

    if (!team) throw new BadRequestException(`Team ${teamId} doesn't exist`);
    return team;
  };

  findOne = async (team_id) => {
    console.log(team_id);

    try {
      const team = await this.teamModel.findOne({
        _id: convertStringToObj(team_id),
      });
      console.log(team);

      if (!team) throw new BadRequestException(`Team ${team_id} doesn't exist`);
      return team;
    } catch (error) {
      console.log(error);
    }
  };
}
