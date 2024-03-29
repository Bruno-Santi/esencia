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
  ],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
