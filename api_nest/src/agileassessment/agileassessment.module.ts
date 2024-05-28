import { Module } from '@nestjs/common';
import { AgileassessmentService } from './agileassessment.service';
import { AgileassessmentController } from './agileassessment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AgilityAssessment,
  AgilityAssessmentSchema,
} from 'src/agileassessment/entities/agileassessment.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AgilityAssessment.name, schema: AgilityAssessmentSchema },
    ]),
    AuthModule,
  ],
  controllers: [AgileassessmentController],
  providers: [AgileassessmentService],
})
export class AgileassessmentModule {}
