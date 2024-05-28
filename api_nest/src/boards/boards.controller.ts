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
  NotFoundException,
  Put,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CardService } from './card.service';
import { CreateBoardDto, UpdateBoardDto, UpdateBoardDatesDto } from './dto/create-board.dto';
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

  @Get('roadmap/:team_id/')
  findforRoadmap(@Param('team_id') team_id: string) {
    console.log("Requesting for roadmap data",team_id);
    return this.boardsService.findforRoadmap(team_id);
  }


  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    console.log(id);

    return this.boardsService.findOne(id);
  }

  @Get('/find-board-sprint/:team_id/:sprint')
  findOneSprint(
    @Param('team_id') team_id: string,
    @Param('sprint') sprint: string,
  ) {
    return this.boardsService.findOneBySprint(team_id, sprint);
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

  @Post(`cards/checklist/:id`)
  async addTitleCheckList(
    @Param('id') id: string,
    @Body() messageBody: { title: string },
  ) {
    console.log(id, messageBody);

    try {
      const cardId = id;
      const title = messageBody.title;

      const updatedCheckList = await this.cardService.addTitleToCheckList(
        cardId,
        title,
      );

      return {
        message: 'Title added to checklist',
        checkList: updatedCheckList,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  @Post(`cards/checklist/:id/item`)
  async addCheckItem(
    @Param('id') id: string,
    @Body() body, // El cuerpo de la solicitud debe contener el contenido del nuevo ítem
  ) {
    console.log(body.newItem2, id);
    const { content } = body.newItem2;
    try {
      const cardId = id;

      const updatedCheckList = await this.cardService.addItemToCheckList(
        cardId,
        content,
      );

      return {
        message: 'Item added to checklist',
        checkList: updatedCheckList,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Put('cards/checklist/:cardId/item/:itemId')
  async toggleItemCheckStatus(
    @Param('cardId') cardId: string,
    @Param('itemId') itemId: string,
  ) {
    console.log(cardId, itemId);

    try {
      const updatedItem = await this.cardService.toggleItemCheckStatus(
        cardId,
        itemId,
      );

      return {
        message: 'Item check status updated successfully',
        item: updatedItem,
      };
    } catch (error) {
      throw new NotFoundException(
        `Error toggling item status: ${error.message}`,
      );
    }
  }

  @Put('dates/:id')
  async updateBoardDates(
    @Param('id') id: string,
    @Body() updateBoardDatesDto: UpdateBoardDatesDto,
  ){
    console.log(updateBoardDatesDto, id)
    try {
      const updatedBoard = await this.boardsService.updateBoardDates(id, updateBoardDatesDto);
      return {
        message: 'Board dates updated successfully',
        item: updatedBoard,
      };
    } catch (error) {
      throw new NotFoundException(
        `Error updating dates: ${error.message}`,
      );
    }
  }
}
