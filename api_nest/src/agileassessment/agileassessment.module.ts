import { Module, forwardRef } from '@nestjs/common';
import { AgileassessmentService } from './agileassessment.service';
import { AgileassessmentController } from './agileassessment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AgilityAssessment,
  AgilityAssessmentSchema,
} from 'src/agileassessment/entities/agileassessment.entity';
import { AuthModule } from 'src/auth/auth.module';

import { TempAgileAssessmentModule } from 'src/temp-agile-assessment/temp-agile-assessment.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AgilityAssessment.name, schema: AgilityAssessmentSchema },
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => TempAgileAssessmentModule),
  ],
  controllers: [AgileassessmentController],
  providers: [AgileassessmentService],
  exports: [AgileassessmentService],
})
export class AgileassessmentModule {}
