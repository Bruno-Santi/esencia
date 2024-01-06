import { Controller, Get, Body, Param, UseGuards } from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';

import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
@UseGuards(JwtAuthGuard)
@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get('/get_long_recommendation/:teamid')
  getLong(@Param('teamid') teamId: string) {
    return this.dataService.getLongRecommendation(teamId);
  }

  @Get('/dashboard-data/:teamid')
  getDashData(@Param('teamid') teamId: string) {
    return this.dataService.getDashboardData(teamId);
  }
}
