import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Mongoose, Types } from 'mongoose';
import { CreateCardDto, UpdateCardDto } from './dto/create-card.dto';

import { Board } from 'src/boards/entities/board.entity';
import { convertStringToObj } from 'common/utils/converStringToObj';

import { Card, CheckItem, CheckList } from './entities/card.entity';

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
  async deleteComment(commentId, cardId, boardId) {
    console.log(commentId, cardId, boardId);
    const convertedCardId = new Types.ObjectId(cardId);
    const convertedCommentId = new Types.ObjectId(commentId);
    try {
      const card = await this.cardModel.findById(convertedCardId);
      if (!card) {
        throw new BadRequestException(
          `La tarjeta con id: ${cardId} no existe.`,
        );
      }

      card.comments = card.comments.filter(
        (comment) => !comment._id.equals(convertedCommentId),
      );

      await card.save();
      console.log(card);

      return { card };
    } catch (error) {
      console.error(error);
      throw new Error('Ocurrió un error al intentar eliminar el comentario');
    }
  }
  async deleteCheckItem(checkItemId, cardId, boardId) {
    console.log(checkItemId, cardId, boardId);
    const convertedCardId = new Types.ObjectId(cardId);
    const convertedCheckItemId = new Types.ObjectId(checkItemId);
    try {
      const card = await this.cardModel.findById(convertedCardId);
      if (!card) {
        throw new BadRequestException(
          `La tarjeta con id: ${cardId} no existe.`,
        );
      }

      card.checkList.forEach((checklist) => {
        checklist.checkItems = checklist.checkItems.filter(
          (item) => !item._id.equals(convertedCheckItemId),
        );
      });

      await card.save();
      console.log(card);

      return { card };
    } catch (error) {
      console.error(error);
      throw new Error('Ocurrió un error al intentar eliminar el checkItem');
    }
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
        card.assignees.push(assignee);
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
    console.log(newComment);
    console.log(newComment);

    if (!card) {
      throw new NotFoundException(`Card with ID ${cardId} not found`);
    }
    console.log(card.comments);

    // Agregar el nuevo comentario a la tarjeta
    card.comments.push(newComment);

    // Guardar la tarjeta actualizada
    await card.save();

    return card;
  }

  async addTitleToCheckList(cardId: string, title: string) {
    try {
      const convertedId = new Types.ObjectId(cardId);
      const card = await this.cardModel.findById(convertedId);

      if (!card) {
        throw new NotFoundException(`Card with ID ${cardId} not found`);
      }

      let checkList = card.checkList[0]; // Obtenemos el primer checklist (asumimos que solo hay uno)

      if (!checkList) {
        // Si no hay un checklist, lo creamos y asignamos el título
        checkList = new CheckList(title);
        card.checkList.push(checkList);
      } else {
        // Si ya hay un checklist, actualizamos su título
        checkList.title = title;
      }

      await card.save(); // Guardamos los cambios en la tarjeta

      return checkList; // Devolvemos el checklist actualizado
    } catch (error) {
      throw new NotFoundException(
        `Error adding title to checklist of card with ID ${cardId}`,
      );
    }
  }

  async addItemToCheckList(cardId: string, newItem: string) {
    console.log(cardId, newItem);

    try {
      const convertedId = new Types.ObjectId(cardId);
      const card = await this.cardModel.findById(cardId);
      console.log(card);

      if (!card) {
        throw new NotFoundException(`Card with ID ${cardId} not found`);
      }
      console.log(card);

      const checkList = card.checkList[0]; // Obtenemos el primer checklist (asumimos que solo hay uno)
      console.log(checkList);

      if (!checkList) {
        // Si no hay un checklist, lanzamos una excepción
        throw new NotFoundException(
          `Checklist not found in card with ID ${cardId}`,
        );
      }

      // Creamos un nuevo ítem para el checklist
      const newItemObj = new CheckItem();
      newItemObj.content = newItem;
      newItemObj.isChecked = false;
      newItemObj._id = new Types.ObjectId();
      // Agregamos el nuevo ítem al checklist
      checkList.checkItems.push(newItemObj);

      await card.save(); // Guardamos los cambios en la tarjeta

      return newItemObj._id; // Devolvemos el checklist actualizado
    } catch (error) {
      throw new NotFoundException(
        `Error adding item to checklist of card with ID ${cardId}`,
      );
    }
  }

  async toggleItemCheckStatus(cardId: string, itemId: string) {
    console.log(itemId);

    try {
      const convertedItemId = new Types.ObjectId(itemId);
      const card = await this.cardModel.findById(cardId);
      if (!card) {
        throw new NotFoundException(`Card with ID ${cardId} not found`);
      }

      const checkList = card.checkList[0];
      if (!checkList) {
        throw new NotFoundException(
          `Checklist not found in card with ID ${cardId}`,
        );
      }
      console.log(checkList.checkItems);

      const item = checkList.checkItems.find(
        (item) => item._id.toString() === itemId,
      );
      console.log(item);

      if (!item) {
        throw new NotFoundException(
          `Item with ID ${itemId} not found in the checklist`,
        );
      }

      // Cambiar el estado isChecked del ítem
      console.log('Before toggling isChecked:', item.isChecked);

      // Cambiar el estado isChecked del ítem
      item.isChecked = !item.isChecked;
      card.markModified('checkList');
      await card.save();
      // Después de cambiar isChecked
      console.log('After toggling isChecked:', item.isChecked);

      return item;
    } catch (error) {
      console.log(error);

      throw new NotFoundException(
        `Error toggling item status in the checklist of card with ID ${cardId}`,
      );
    }
  }
}
