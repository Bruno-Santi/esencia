import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from './entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { TeamModule } from 'src/team/team.module';
import { SlackServiceModule } from '../slack-service/slack-service.module';
import { EmailModule } from 'src/email/email.module';
import { TempAgileAssessmentModule } from 'src/temp-agile-assessment/temp-agile-assessment.module';
import {
  TempAgileAssessment,
  TempAgileAssessmentSchema,
} from 'src/temp-agile-assessment/entities/temp-agile-assessment.entity';

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
      {
        name: TempAgileAssessment.name,
        schema: TempAgileAssessmentSchema,
        collection: 'tempAgileAssessment',
      },
    ]),
    JwtModule,
    TeamModule,
    SlackServiceModule,
    EmailModule,
    forwardRef(() => TempAgileAssessmentModule),
  ],
  exports: [AuthService, MongooseModule],
})
export class AuthModule {}
