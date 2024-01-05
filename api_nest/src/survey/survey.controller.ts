import { Controller, Post, Param } from '@nestjs/common';
import { SurveyService } from './survey.service';

@Controller('survey')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post(':teamId')
  createNewSurvey(@Param('teamId') teamId: string) {
    return this.surveyService.createNewSurvey(teamId);
  }
}
