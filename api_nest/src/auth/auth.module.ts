import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TeamModule } from 'src/team/team.module';
import { SlackServiceModule } from '../slack-service/slack-service.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: 'user',
      },
    ]),
    JwtModule,
    TeamModule,
    SlackServiceModule,
    EmailModule,
  ],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
