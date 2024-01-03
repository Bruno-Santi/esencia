import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';

import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { ParseMongoIdPipe } from '../../common/pipes/parse-mongo-id.pipe';
import { Types } from 'mongoose';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly JwtGuardGuard: JwtAuthGuard,
    private readonly ParseMongoIdPipe: ParseMongoIdPipe,
  ) {}

  @Post(':scrumId')
  @UseGuards(JwtAuthGuard)
  create(
    @Body() createTeamDto: CreateTeamDto,
    @Param('scrumId', ParseMongoIdPipe) scrumId: Types.ObjectId,
  ) {
    return this.teamService.create(createTeamDto, scrumId);
  }
  @Get(':scrumId')
  @UseGuards(JwtAuthGuard)
  GetTeams(@Param('scrumId', ParseMongoIdPipe) scrumId: Types.ObjectId) {
    return this.teamService.findAllTeams(scrumId);
  }
}
