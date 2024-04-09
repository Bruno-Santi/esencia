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

  @Post(':scrumId')
  create(
    @Body() createTeamDto: CreateTeamDto,
    @Param('scrumId', ParseMongoIdPipe) scrumId: Types.ObjectId,
  ) {
    return this.teamService.create(createTeamDto, scrumId);
  }
  @Get(':scrumId')
  GetTeams(@Param('scrumId', ParseMongoIdPipe) scrumId: Types.ObjectId) {
    return this.teamService.findAllTeams(scrumId);
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
