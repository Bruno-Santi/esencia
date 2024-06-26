import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { MembersModule } from 'src/members/members.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, surveySchema } from './entities/survey.entity';
import { TeamModule } from 'src/team/team.module';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';
import { DaySurvey, daySurveySchema } from './entities/daySurvey.entity';

@Module({
  controllers: [SurveyController],
  providers: [SurveyService, JwtAuthGuard],
  imports: [
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    MongooseModule.forFeature([
      {
        name: Survey.name,
        schema: surveySchema,
        collection: 'surveys',
      },
    ]),
    MongooseModule.forFeature([
      {
        name: DaySurvey.name,
        schema: daySurveySchema,
        collection: 'TeamSurveys',
      },
    ]),
    JwtModule,
    MembersModule,
    TeamModule,
  ],
  exports: [MongooseModule, SurveyModule],
})
export class SurveyModule {}
