import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { MembersModule } from 'src/members/members.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, surveySchema } from './entities/survey.entity';
import { TeamModule } from 'src/team/team.module';
@Module({
  controllers: [SurveyController],
  providers: [SurveyService, JwtService],
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
    MembersModule,
    TeamModule,
  ],
  exports: [MongooseModule],
})
export class SurveyModule {}
