import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DashboardDataService } from './dashboard_data.service';
import { CreateDashboardDatumDto } from './dto/create-dashboard_datum.dto';
import { UpdateDashboardDatumDto } from './dto/update-dashboard_datum.dto';

@Controller('dashboard_data')
export class DashboardDataController {
  constructor(private readonly dashboardDataService: DashboardDataService) {}

  @Get(':teamId')
  allData(@Param('teamId') teamId: string) {
    console.log(teamId);

    return this.dashboardDataService.dashboardAllData(teamId);
  }
}
