import { Controller, Post, Param, Body, UseGuards, Put } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { UpdateSurveyDto } from './dto/update-survey.dto';

@UseGuards(JwtAuthGuard)
@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post(':teamId')
  createNewSurvey(@Param('teamId') teamId: string) {
    return this.surveyService.createNewSurvey(teamId);
  }

  @Post()
  postSurvey(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveyService.postSurvey(createSurveyDto);
  }
}
