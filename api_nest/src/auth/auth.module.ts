import { Module } from '@nestjs/common';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ScrumMaster, ScrumMasterSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TeamModule } from 'src/team/team.module';
import { SlackServiceModule } from '../slack-service/slack-service.module';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: ScrumMaster.name,
        schema: ScrumMasterSchema,
        collection: 'scrumMaster',
      },
    ]),
    JwtModule,
    TeamModule,
    SlackServiceModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
  ],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
