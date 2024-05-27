import { PartialType } from '@nestjs/mapped-types';
import { CreateSlackServiceDto } from './create-slack-service.dto';

export class UpdateSlackServiceDto extends PartialType(CreateSlackServiceDto) {}
