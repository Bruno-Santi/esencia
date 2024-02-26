import { Module } from '@nestjs/common';
import { BoardgatewayService } from './boardgateway.service';
import { BoardgatewayGateway } from './boardgateway.gateway';
import { BoardsService } from 'src/boards/boards.service';
import { BoardsModule } from 'src/boards/boards.module';

@Module({
  providers: [BoardgatewayGateway, BoardgatewayService],
  imports: [BoardsModule],
})
export class BoardgatewayModule {}
