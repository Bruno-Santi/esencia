import { Module } from '@nestjs/common';
import { DashboardDataService } from './dashboard_data.service';
import { DashboardDataController } from './dashboard_data.controller';
import { RetroModule } from 'src/retro/retro.module';
import { BoardsModule } from 'src/boards/boards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Test1, Test1Schema } from './entities/Test1.entity';
import { Board, BoardsSchema } from 'src/boards/entities/board.entity';
import { Card, CardSchema } from 'src/boards/entities/card.entity';
import { Retro, RetroSchema } from 'src/retro/entities/retro.entity';
import { Report, ReportSchema } from './entities/Report.entity';
import {
  Recommendation,
  RecommendationSchema,
} from './entities/Recommendation.entity';
import { Survey, surveySchema } from 'src/survey/entities/survey.entity';
import {
  DaySurvey,
  daySurveySchema,
} from 'src/survey/entities/daySurvey.entity';

@Module({
  controllers: [DashboardDataController],
  providers: [DashboardDataService],
  imports: [
    RetroModule,
    BoardsModule,
    MongooseModule.forFeature([
      {
        name: Test1.name,
        schema: Test1Schema,
      },
      {
        name: Board.name,
        schema: BoardsSchema,
        collection: 'Boards',
      },
      {
        name: Card.name,
        schema: CardSchema,
        collection: 'Cards',
      },
      {
        name: Retro.name,
        schema: RetroSchema,
        collection: 'TeamRetro',
      },
      {
        name: Survey.name,
        schema: surveySchema,
        collection: 'surveys',
      },

      {
        name: DaySurvey.name,
        schema: daySurveySchema,
        collection: 'TeamSurveys',
      },

      {
        name: Report.name,
        schema: ReportSchema,
      },
      {
        name: Recommendation.name,
        schema: RecommendationSchema,
      },
    ]),
  ],
})
export class DashboardDataModule {}
