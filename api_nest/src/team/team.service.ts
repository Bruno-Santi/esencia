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
import { log } from 'console';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  async create(createTeamDto: CreateTeamDto) {
    try {
      console.log(createTeamDto);

      if (
        !Array.isArray(createTeamDto.members) ||
        createTeamDto.members.length === 0
      ) {
        throw new BadRequestException('Members array cannot be empty');
      }

      const adminMember = createTeamDto.members.find(
        (member) => member.role === 'admin',
      );
      if (!adminMember) {
        throw new BadRequestException('An admin member is required');
      }

      const userId = adminMember.id;

      await this.searchScrumMaster(userId);

      const existingTeam = await this.teamModel.findOne({
        name: createTeamDto.name,
        'members.id': userId,
      });

      if (existingTeam) {
        throw new BadRequestException(
          `Team ${createTeamDto.name} already exists`,
        );
      }

      console.log(createTeamDto.logo);

      const team = await this.teamModel.create({
        ...createTeamDto,
        logo: createTeamDto.logo,
      });

      return team;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async createTempTeam(teamName) {
    console.log(teamName);

    try {
      const team = await this.teamModel.create({
        name: teamName.name,
      });
      return team;
    } catch (error) {
      console.log(error);
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
  async findAllTeams(userId: string) {
    console.log(userId);

    try {
      // Buscar equipos donde el array de miembros contenga un objeto con id igual a userId
      const teams = await this.teamModel.find({ 'members.id': userId });
      console.log(teams);

      return teams;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  searchScrumMaster = async (userId) => {
    const user = await this.authService.findScrumMaster(userId);

    if (!user) throw new BadRequestException(`User ${userId} doesn't exist`);
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

  async addAdmin(teamId: string, newAdmin: { id: string; role: string }) {
    if (newAdmin.role !== 'admin') {
      throw new BadRequestException('New member role must be admin');
    }

    const team = await this.searchTeam(teamId);

    const existingAdmin = team.members.find(
      (member) => member.role === 'admin',
    );
    if (existingAdmin) {
      throw new BadRequestException('Admin member already exists in the team');
    }

    team.members.push(newAdmin);
    await team.save();

    return team;
  }
}
