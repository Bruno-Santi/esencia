import { PartialType } from '@nestjs/mapped-types';
import { CreateAgileassessmentDto } from './create-agileassessment.dto';

export class UpdateAgileassessmentDto extends PartialType(CreateAgileassessmentDto) {}
