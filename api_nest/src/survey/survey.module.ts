import { Module, UseGuards } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { MembersModule } from 'src/members/members.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Survey, surveySchema } from './entities/survey.entity';
import { TeamModule } from 'src/team/team.module';
import { JwtAuthGuard } from 'common/jwt-guard/jwt-guard.guard';

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
    JwtModule,
    MembersModule,
    TeamModule,
  ],
  exports: [MongooseModule],
})
export class SurveyModule {}
