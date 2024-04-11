import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { CreateRecommendationDto } from './dto/create-recommendation.dto';
import { UpdateRecommendationDto } from './dto/update-recommendation.dto';

@Controller('recommendations')
export class RecommendationsController {
  constructor(
    private readonly recommendationsService: RecommendationsService,
  ) {}

  @Get('/survey-averages/:teamId') // Otra opción podría ser '/day-survey/:teamId'
  getSurveyAverages(@Param('teamId') teamId: string) {
    console.log(teamId);
    return this.recommendationsService.generateRecommendations(teamId);
  }
}
