import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  Put,
  Get,
  Query,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { CreateDailySurveyDto } from './dto/create-daily-survey.dto';

@UseGuards(JwtAuthGuard)
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  // @Post(':teamId')
  // createNewSurvey(@Param('teamId') teamId: string) {
  //   return this.surveyService.createNewSurvey(teamId);
  // }

  @Post()
  postSurvey(@Body() createSurveyDto: CreateSurveyDto) {
    console.log(createSurveyDto);

    return this.surveyService.postSurvey(createSurveyDto);
  }
  @Post('/day-survey')
  createNewDaySurvey(@Body() createDailySurveyDto: CreateDailySurveyDto) {
    console.log(createDailySurveyDto);

    return this.surveyService.createNewSurveyAndDailySurvey(
      createDailySurveyDto,
    );
  }
  @Get('/day-survey/team/:teamId') // Otra opción podría ser '/day-survey/:teamId'
  getDailySurvey(@Param('teamId') teamId: string) {
    console.log(teamId);
    return this.surveyService.getDailySurvey(teamId);
  }
  @Get(':teamId/:userId')
  checkSurvey(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.surveyService.checkSurvey(teamId, userId);
  }
}
