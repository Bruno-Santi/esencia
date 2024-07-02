import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';

import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { ParseMongoIdPipe } from '../../common/pipes/parse-mongo-id.pipe';
import { Types } from 'mongoose';
@UseGuards(JwtAuthGuard)
@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly JwtGuardGuard: JwtAuthGuard,
    private readonly ParseMongoIdPipe: ParseMongoIdPipe,
  ) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    console.log(createTeamDto);

    return this.teamService.create(createTeamDto);
  }
  @Get(':userId')
  GetTeams(@Param('userId') userId: string) {
    console.log(userId);

    return this.teamService.findAllTeams(userId);
  }
  @Delete(':teamId')
  deleteTeam(@Param('teamId') teamId: string) {
    return this.teamService.deleteOne(teamId);
  }
  @Get()
  findOne(@Query('team_id') team_id: string) {
    console.log(team_id);

    return this.teamService.findOne(team_id);
  }
}
