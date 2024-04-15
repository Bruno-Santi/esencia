import { Module } from '@nestjs/common';
import { SprintreportService } from './sprintreport.service';
import { SprintreportController } from './sprintreport.controller';
import { SurveyModule } from 'src/survey/survey.module';
import { RetroModule } from 'src/retro/retro.module';
import { BoardsModule } from 'src/boards/boards.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SprintReport, SprintReportSchema } from 'src/sprintreport/entities/sprintreport.entity';


@Module({
  imports: [SurveyModule, RetroModule, BoardsModule, MongooseModule.forFeature([
    { name: SprintReport.name, schema: SprintReportSchema }
  ]),],
  controllers: [SprintreportController],
  providers: [SprintreportService, RetroModule, BoardsModule, SurveyModule],
})
export class SprintreportModule { }
