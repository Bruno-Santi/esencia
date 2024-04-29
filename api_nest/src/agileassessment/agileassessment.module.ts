import { Module } from '@nestjs/common';
import { AgileassessmentService } from './agileassessment.service';
import { AgileassessmentController } from './agileassessment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AgilityAssessment, AgilityAssessmentSchema } from 'src/agileassessment/entities/agileassessment.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: AgilityAssessment.name, schema: AgilityAssessmentSchema }])],
  controllers: [AgileassessmentController],
  providers: [AgileassessmentService],
})
export class AgileassessmentModule { }
