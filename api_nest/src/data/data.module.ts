import { Module, forwardRef } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { TeamModule } from 'src/team/team.module';
import { MembersModule } from 'src/members/members.module';
import { MembersService } from 'src/members/members.service';

@Module({
  controllers: [DataController],
  providers: [DataService],
  imports: [TeamModule, MembersModule],
})
export class DataModule {}
