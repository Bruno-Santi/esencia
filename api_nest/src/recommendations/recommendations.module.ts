import { Module } from '@nestjs/common';
import { SurveyModule } from 'src/survey/survey.module'; // Adjust the path as per your project structure
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';

@Module({
  imports: [SurveyModule],
  controllers: [RecommendationsController],
  providers: [RecommendationsService],
})
export class RecommendationsModule {}
