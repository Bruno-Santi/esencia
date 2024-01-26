import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  Put,
  Get,
} from '@nestjs/common';
import { SurveyService } from './survey.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';

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
    console.log(createSurveyDto);

    return this.surveyService.postSurvey(createSurveyDto);
  }

  @Get(':teamId/:userId')
  checkSurvey(
    @Param('teamId') teamId: string,
    @Param('userId') userId: string,
  ) {
    return this.surveyService.checkSurvey(teamId, userId);
  }
}
