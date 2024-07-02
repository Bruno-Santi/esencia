import { PartialType } from '@nestjs/mapped-types';
import { CreateTempAgileAssessmentDto } from './create-temp-agile-assessment.dto';

export class UpdateTempAgileAssessmentDto extends PartialType(CreateTempAgileAssessmentDto) {}
