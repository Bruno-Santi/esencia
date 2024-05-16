import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TeamModule } from './team/team.module';
import { MembersModule } from './members/members.module';
import { SurveyModule } from './survey/survey.module';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { DataModule } from './data/data.module';
import { RetroModule } from './retro/retro.module';
import { BoardsModule } from './boards/boards.module';
import { BoardgatewayModule } from './boardgateway/boardgateway.module';
import { PruebaModule } from './prueba/prueba.module';
import { RecommendationsModule } from './recommendations/recommendations.module';

import { SprintreportModule } from './sprintreport/sprintreport.module';
import { DashboardDataModule } from './dashboard_data/dashboard_data.module';
import { MercadoPagoModule } from './mercado-pago/mercado-pago.module';
import { AgileassessmentModule } from './agileassessment/agileassessment.module';

import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '1h' },
    }),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
    }),
    AuthModule,
    TeamModule,
    MembersModule,
    SurveyModule,
    DataModule,
    RetroModule,
    BoardsModule,
    BoardgatewayModule,
    PruebaModule,
    RecommendationsModule,
    SprintreportModule,
    DashboardDataModule,
    MercadoPagoModule,
    AgileassessmentModule,
    EmailModule,
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
