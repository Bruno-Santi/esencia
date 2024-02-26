import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CardService } from './card.service';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';

import { Socket } from 'socket.io';

@Controller('boards')
export class BoardController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly cardService: CardService,
    // Inyectar el WebSocket Gateway
  ) {}

  // Endpoints para boards

  @Post()
  createBoard(@Body() createBoardDto: CreateBoardDto) {
    console.info('createBoardDto', createBoardDto);
    return this.boardsService.create(createBoardDto);
  }

  @Get(':team_id')
  findAllBoards(@Param('team_id') team_id: string) {
    console.log(team_id);
    return this.boardsService.findAll(team_id);
  }
  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    console.log(id);

    return this.boardsService.findOne(id);
  }
  @Patch(':board_id')
  updateBoard(
    @Param('board_id') board_id: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardsService.update(board_id, updateBoardDto);
  }

  @Delete(':board_id')
  removeBoard(@Param('board_id') board_id: string) {
    return this.boardsService.remove(board_id);
  }

  // Endpoints para cards

  @Post('cards')
  async createCard(@Body() createCardDto: CreateCardDto, client: Socket) {
    console.log(createCardDto);

    const createdCard = await this.cardService.create(createCardDto, client);

    return createdCard;
  }

  @Patch('cards/:id')
  async updateCard(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto,
  ) {
    console.log(updateCardDto);

    const updatedCard = await this.cardService.updateStatus(id, updateCardDto);

    return updatedCard;
  }

  @Delete('cards/:card_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCard(@Param('card_id') card_id: string) {
    const card = await this.cardService.remove(card_id);
  }
}
