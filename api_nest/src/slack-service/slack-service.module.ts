import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SlackServiceService } from './slack-service.service';
import { SlackServiceController } from './slack-service.controller';

@Module({
  imports: [HttpModule],
  controllers: [SlackServiceController],
  providers: [SlackServiceService],
  exports: [SlackServiceService],
})
export class SlackServiceModule {}
