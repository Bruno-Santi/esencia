import { Module } from '@nestjs/common';
import { TempAgileAssessmentService } from './temp-agile-assessment.service';
import { TempAgileAssessmentController } from './temp-agile-assessment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import {
  TempAgileAssessment,
  TempAgileAssessmentSchema,
} from './entities/temp-agile-assessment.entity';

@Module({
  controllers: [TempAgileAssessmentController],
  providers: [TempAgileAssessmentService],
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
      ,
    ]),
  ],
})
export class TempAgileAssessmentModule {}
