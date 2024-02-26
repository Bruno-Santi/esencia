import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardController } from './boards.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardsSchema } from './entities/board.entity';

import { TeamModule } from 'src/team/team.module';
import { Card, CardSchema } from './entities/card.entity';
import { CardService } from './card.service';

@Module({
  controllers: [BoardController],
  providers: [BoardsService, CardService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Board.name,
        schema: BoardsSchema,
        collection: 'Boards',
      },
      {
        name: Card.name,
        schema: CardSchema,
        collection: 'Cards',
      },
    ]),

    TeamModule,
  ],
  exports: [BoardsModule, BoardsService, CardService],
})
export class BoardsModule {}
