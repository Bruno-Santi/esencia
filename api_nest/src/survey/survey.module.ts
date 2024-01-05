import { Module } from '@nestjs/common';
import { SurveyService } from './survey.service';
import { SurveyController } from './survey.controller';
import { MembersModule } from 'src/members/members.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { JwtService } from '@nestjs/jwt';
@Module({
  controllers: [SurveyController],
  providers: [SurveyService, JwtService],
  imports: [
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    MembersModule,
  ],
})
export class SurveyModule {}
