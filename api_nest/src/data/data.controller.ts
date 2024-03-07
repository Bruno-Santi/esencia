import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';

import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
@UseGuards(JwtAuthGuard)
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/get_reports/:teamid/:sprint')
  getLong(@Param('teamid') teamId: string, @Param('sprint') sprint: string) {
    console.log(teamId, sprint);

    return this.dataService.getReports(teamId, sprint);
  }

  @Get('/dashboard-data/:teamid/:sprint/:members')
  getDashData(
    @Param('teamid') teamId: string,
    @Param('sprint') sprint: string,
    @Param('members') members: string,
  ) {
    console.log(teamId);
    console.log(sprint);
    console.log(members);

    return this.dataService.getDashboardData(teamId, sprint, members);
  }
}
