import { PartialType } from '@nestjs/mapped-types';
import { CreateSprintreportDto } from './create-sprintreport.dto';

export class UpdateSprintreportDto extends PartialType(CreateSprintreportDto) {}
