import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team } from './entities/team.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private readonly teamModel: Model<Team>,
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

      const team = await this.teamModel.create({
        ...createTeamDto,
        scrumId: scrumId,
        logo: null,
      });

      return team;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async findAllTeams(scrumId) {
    try {
      await this.searchScrumMaster(scrumId);
      const teams = await this.teamModel.find({ scrumId: scrumId });
      if (!teams.length)
        throw new BadRequestException(
          `The scrum master ${scrumId} doesn't have any teams`,
        );

      return teams;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  searchScrumMaster = async (scrumId) => {
    const user = await this.authService.findScrumMaster(scrumId);

    if (!user) throw new BadRequestException(`User ${scrumId} doesn't exist`);
  };
}
