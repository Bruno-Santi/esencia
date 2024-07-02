import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TempAgileAssessmentService } from './temp-agile-assessment.service';
import { CreateTempAgileAssessmentDto } from './dto/create-temp-agile-assessment.dto';

@Controller('temp-agile-assessment')
export class TempAgileAssessmentController {
  constructor(
    private readonly tempAgileAssessmentService: TempAgileAssessmentService,
  ) {}

  @Post()
  create(@Body() createTempAgileAssessmentDto: CreateTempAgileAssessmentDto) {
    console.log(createTempAgileAssessmentDto);
    return this.tempAgileAssessmentService.create(createTempAgileAssessmentDto);
  }
}
