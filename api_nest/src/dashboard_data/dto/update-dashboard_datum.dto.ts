import { PartialType } from '@nestjs/mapped-types';
import { CreateDashboardDatumDto } from './create-dashboard_datum.dto';

export class UpdateDashboardDatumDto extends PartialType(CreateDashboardDatumDto) {}
