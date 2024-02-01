import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TeamModule } from 'src/team/team.module';

@Module({
  controllers: [DataController],
  providers: [DataService],
  imports: [TeamModule],
})
export class DataModule {}
