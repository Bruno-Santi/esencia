import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';

import { Board } from 'src/boards/entities/board.entity';
import { convertStringToObj } from 'common/utils/converStringToObj';

import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<Card>,
    @InjectModel(Board.name) private boardModel: Model<Board>,
  ) {}

  async create(createCardDto: CreateCardDto, client) {
    const { boardId, status } = createCardDto;
    const convertedBoardId = convertStringToObj(boardId);

    const board = await this.boardModel.findById(convertedBoardId);

    if (!board) {
      throw new NotFoundException(`Board with ID ${boardId} not found`);
    }

    const column = board.columns.find((col) => col.name === status);

    if (!column) {
      throw new NotFoundException(
        `Column with status ${status} not found in board ${boardId}`,
      );
    }

    const newCard = new this.cardModel(createCardDto);

    await newCard.save();

    column.cards.push(newCard._id);

    await board.save();

    return newCard;
  }

  findAll() {
    return `This action returns all card`;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  async updateStatus(cardId: string, updateCardDto: UpdateCardDto) {
    console.log(updateCardDto);

    const { status, title, description, assignees } = updateCardDto;
    console.log(updateCardDto);

    const convertedCardId = convertStringToObj(cardId);

    const card = await this.cardModel.findById(convertedCardId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }
    if (assignees && assignees.length > 0) {
      assignees.forEach((assignee) => {
        card.assignees.push(assignee); // Asumiendo que `assignees` es un array de objetos
      });
    }
    const board = await this.boardModel.findOne({ 'columns.cards': card._id });
    if (!board) {
      throw new NotFoundException(`Board not found for card with ID ${cardId}`);
    }

    const currentColumn = board.columns.find((column) =>
      column.cards.includes(card._id),
    );
    if (!currentColumn) {
      throw new NotFoundException(
        `Current column not found for card with ID ${cardId}`,
      );
    }
    currentColumn.cards = currentColumn.cards.filter(
      (c) => c.toString() !== cardId,
    );

    const newColumn = board.columns.find((column) => column.name === status);
    if (!newColumn) {
      throw new BadRequestException(`Column with status ${status} not found`);
    }

    newColumn.cards.push(card._id);

    card.status = status;

    if (title) {
      card.title = title;
    }

    if (description) {
      card.description = description;
    }
    const updatedBoard = await this.boardModel.findById(board._id).populate({
      path: 'columns.cards',
      model: 'Card',
    });
    await card.save();
    await board.save();

    return { card, board: updatedBoard };
  }
  async removeAssignee(cardId: string, assigneeId: string) {
    const card = await this.cardModel.findById(cardId);
    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    const assigneeIndex = card.assignees.findIndex(
      (assignee) => assignee.memberId === assigneeId,
    );
    if (assigneeIndex === -1) {
      throw new NotFoundException(
        `Assignee with ID ${assigneeId} not found in card ${cardId}`,
      );
    }

    card.assignees.splice(assigneeIndex, 1); // Remove assignee from array

    await card.save();
    return card;
  }
  async remove(card_id: string) {
    try {
      const convertedCardId = convertStringToObj(card_id);
      const card = await this.cardModel.findById(convertedCardId);
      const boardCard =
        await this.boardModel.findByIdAndDelete(convertedCardId);
      if (!card) {
        throw new NotFoundException(`Card with ID ${card_id} not found`);
      }
      await this.cardModel.findByIdAndDelete(convertedCardId);

      return {
        deleted: 'ok',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addCommentToCard(cardId: string, newComment: any) {
    // Buscar la tarjeta por su ID
    const convertedId = new Types.ObjectId(cardId);
    const card = await this.cardModel.findOne(convertedId);
    console.log(card);

    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }

    // Agregar el nuevo comentario a la tarjeta
    card.comments.push(newComment);

    // Guardar la tarjeta actualizada
    await card.save();

    return card;
  }
}
