import {
  BadGatewayException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { BoardsService } from 'src/boards/boards.service';
import { CardService } from '../boards/card.service';
import { UpdateCardDto } from 'src/boards/dto/create-card.dto';
import { Socket } from 'socket.io';

@Injectable()
export class BoardgatewayService {
  private boards: Map<string, any> = new Map();

  constructor(
    private readonly boardsService: BoardsService,
    private readonly cardService: CardService,
  ) {}

  saveBoardData(boardId: string, boardData): void {
    const existingData = this.boards.get(boardId);
    if (existingData) {
      // Si existe, actualiza los datos
      const index = existingData.findIndex(
        (data) => data._id === boardData._id,
      );
      if (index !== -1) {
        existingData[index] = boardData;
      } else {
        existingData.push(boardData);
      }
      this.boards.set(boardId, existingData);
    } else {
      this.boards.set(boardId, [boardData]);
    }
  }
  async getBoardData(boardId) {
    if (boardId === 'undefined') return;
    try {
      const convertedBoardId = new Types.ObjectId(boardId);
      const boardData = await this.boardsService.findOne(convertedBoardId);

      this.saveBoardData(boardId, boardData);

      return boardData;
    } catch (error) {
      throw new BadGatewayException('Error while getting board data');
    }
  }

  async saveNewCard(boardId: string, newCard: any): Promise<void> {
    const boardData = this.boards.get(boardId);

    const column = boardData.columns.find(
      (column) => column.name === newCard.status,
    );
    if (column) {
      column.cards.push(newCard);

      this.saveBoardData(boardId, boardData);
    } else {
      throw new BadGatewayException(`Column not found for the card ${newCard}`);
    }

    return boardData;
  }
  async saveNewComment(
    boardId: string,
    cardId: string,
    newComment: any,
  ): Promise<void> {
    try {
      const boardData = await this.getBoardData(boardId);
      await this.cardService.addCommentToCard(cardId, newComment);
      if (!boardData) {
        throw new NotFoundException(`Board with ID ${boardId} not found`);
      }

      let targetCard;

      for (const column of boardData.columns) {
        targetCard = column.cards.find(
          (card) => card._id.toString() === cardId,
        );

        if (targetCard) {
          break;
        }
      }

      if (!targetCard) {
        throw new NotFoundException(
          `Card with ID ${cardId} not found in board with ID ${boardId}`,
        );
      }

      if (!targetCard.comments) {
        targetCard.comments = [];
      }

      targetCard.comments.push(newComment);

      await this.saveBoardData(boardId, boardData);
      return boardData;
    } catch (error) {
      console.error('Error al guardar el nuevo comentario:', error.message);
      throw error;
    }
  }
  async updateCardStatus(cardId: string, newStatus: string): Promise<void> {
    const updateCardDto: UpdateCardDto = { status: newStatus };

    try {
      await this.cardService.updateStatus(cardId, updateCardDto);
    } catch (error) {
      throw new Error(
        'Error al actualizar el estado de la tarjeta en la base de datos.',
      );
    }
  }

  async deleteCard(boardId: string, cardId: string): Promise<any> {
    try {
      const boardData = await this.getBoardData(boardId);
      await this.cardService.remove(cardId);
      for (const column of boardData.columns) {
        const index = column.cards.findIndex(
          (card) => card._id.toString() === cardId,
        );
        if (index !== -1) {
          column.cards.splice(index, 1);
          break;
        }
      }

      await this.saveBoardData(boardId, boardData);

      return boardData;
    } catch (error) {
      throw new Error(`Error deleting card: ${error.message}`);
    }
  }
  async deleteComment(
    commentId: string,
    cardId: string,
    boardId: string,
  ): Promise<any> {
    try {
      const boardData = await this.getBoardData(boardId);
      await this.cardService.deleteComment(commentId, cardId, boardId);
      for (const column of boardData.columns) {
        const cardIndex = column.cards.findIndex(
          (card) => card._id.toString() === cardId,
        );
        if (cardIndex !== -1) {
          const commentIndex = column.cards[cardIndex].comments.findIndex(
            (comment) => comment._id.toString() === commentId,
          );
          if (commentIndex !== -1) {
            column.cards[cardIndex].comments.splice(commentIndex, 1);
            break;
          }
        }
      }

      await this.saveBoardData(boardId, boardData);
      return boardData;
    } catch (error) {
      throw new Error(`Error deleting comment from board: ${error.message}`);
    }
  }
  async deleteItem(
    itemId: string,
    cardId: string,
    boardId: string,
  ): Promise<any> {
    try {
      const boardData = await this.getBoardData(boardId);
      await this.cardService.deleteCheckItem(itemId, cardId, boardId);
      for (const column of boardData.columns) {
        const cardIndex = column.cards.findIndex(
          (card) => card._id.toString() === cardId,
        );
        if (cardIndex !== -1) {
          const itemIndex = column.cards[
            cardIndex
          ].checkList[0].checkItems.findIndex(
            (item) => item._id.toString() === itemId,
          );
          if (itemIndex !== -1) {
            column.cards[cardIndex].checkList[0].checkItems.splice(
              itemIndex,
              1,
            );
            break;
          }
        }
      }

      await this.saveBoardData(boardId, boardData);
      return boardData;
    } catch (error) {
      throw new Error(`Error removing item from board: ${error.message}`);
    }
  }

  async updateCardTitleAndDescription(
    cardId: string,
    boardId: string,
    newData: any,
  ): Promise<void> {
    try {
      const convertedCardId = new Types.ObjectId(cardId);

      const boardData = await this.getBoardData(boardId);
      const updateCardDto: UpdateCardDto = {
        title: newData.title,
        description: newData.description,
        status: newData.status,
      };
      await this.cardService.updateStatus(cardId, updateCardDto);

      for (const column of boardData.columns) {
        const cardIndex = column.cards.findIndex(
          (card) => card._id.toString() === convertedCardId.toString(),
        );

        if (cardIndex !== -1) {
          console.log('Tarjeta encontrada:', column.cards[cardIndex]);
          console.log('Nuevos datos:', newData);

          column.cards[cardIndex].title = newData.title;
          column.cards[cardIndex].description = newData.description;

          console.log('Tarjeta actualizada:', column.cards[cardIndex]);
          break;
        }
      }

      await this.saveBoardData(boardId, boardData);

      return boardData;
    } catch (error) {
      throw error;
    }
  }
  async updateCardAssigneesInBoard(
    boardId: string,
    cardId: string,
    newAssignees: any[],
    status,
  ): Promise<void> {
    try {
      const boardData = await this.getBoardData(boardId);

      if (!boardData) {
        throw new NotFoundException(`Board with ID ${boardId} not found`);
      }

      const columnToUpdate = boardData.columns.find((column) =>
        column.cards.some((card) => card._id.toString() === cardId),
      );

      if (!columnToUpdate) {
        throw new NotFoundException(
          `Card with ID ${cardId} not found in board with ID ${boardId}`,
        );
      }

      const cardToUpdate = columnToUpdate.cards.find(
        (card) => card._id.toString() === cardId,
      );

      if (!cardToUpdate) {
        throw new NotFoundException(
          `Card with ID ${cardId} not found in board with ID ${boardId}`,
        );
      }

      const existingAssigneesIds = new Set(
        cardToUpdate.assignees.map((assignee) => assignee.memberId),
      );
      newAssignees.forEach((newAssignee) => {
        if (existingAssigneesIds.has(newAssignee.memberId)) {
          throw new Error(
            `Assignee with ID ${newAssignee.memberId} already exists in the card`,
          );
        }
      });

      cardToUpdate.assignees = [...cardToUpdate.assignees, ...newAssignees];

      await this.saveBoardData(boardId, boardData);

      const updateCardDto: UpdateCardDto = {
        status: status,
        assignees: newAssignees,
      };
      await this.cardService.updateStatus(cardId, updateCardDto);
      return boardData;
    } catch (error) {
      throw error;
    }
  }

  async removeAssigneeFromCard(
    boardId: string,
    cardId: string,
    assigneeId: string,
    socket: Socket,
  ) {
    console.log(cardId);
    try {
      await this.cardService.removeAssignee(cardId, assigneeId);
      const board = await this.getBoardData(boardId);
      console.log(cardId);
      console.log(assigneeId);

      if (!board) {
        throw new Error(`Board with ID ${boardId} not found`);
      }
      console.log(board);

      const card = board.columns
        .flatMap((column) => column.cards)
        .find((c) => c._id.toString() === cardId);
      if (!card) {
        throw new Error(
          `Card with ID ${cardId} not found in board with ID ${boardId}`,
        );
      }
      console.log(card);

      const assigneeIndex = card.assignees.findIndex(
        (a) => a.memberId.toString() === assigneeId,
      );
      console.log(assigneeIndex);

      card.assignees.splice(assigneeIndex, 1);

      await board.save();

      socket.emit('assigneeRemovedFromCard', { boardId, cardId, assigneeId });

      return board;
    } catch (error) {
      throw new Error(`Error removing assignee from card: ${error.message}`);
    }
  }

  async addNewCheckList(
    boardId: string,
    cardId: string,
    checkListTitle: string,
  ) {
    try {
      const updatedCard = await this.cardService.addTitleToCheckList(
        cardId,
        checkListTitle,
      );

      const boardData = await this.getBoardData(boardId);

      return boardData;
    } catch (error) {
      console.error('Error adding new checklist:', error.message);
      throw error;
    }
  }

  async addNewItem(
    boardId: string,
    cardId: string,
    checkListId: string,
    newItemContent: { content: string; isChecked: boolean },
  ) {
    console.log(newItemContent);

    try {
      const boardData = await this.getBoardData(boardId);
      const newItem2 = await this.cardService.addItemToCheckList(
        cardId,
        newItemContent.content,
      );
      console.log(newItem2);

      const targetCard = boardData.columns
        .flatMap((column) => column.cards)
        .find((card) => card._id.toString() === cardId);

      if (!targetCard) {
        throw new NotFoundException(
          `Card with ID ${cardId} not found in board with ID ${boardId}`,
        );
      }

      const targetCheckList = targetCard.checkList.find(
        (checkList) => checkList._id.toString() === checkListId,
      );

      if (!targetCheckList) {
        throw new NotFoundException(
          `Checklist with ID ${checkListId} not found in card with ID ${cardId}`,
        );
      }

      const newItem = {
        content: newItemContent.content,
        isChecked: newItemContent.isChecked,
        _id: newItem2,
      };

      targetCheckList.checkItems.push(newItem);

      await this.saveBoardData(boardId, boardData);

      return boardData;
    } catch (error) {
      console.error('Error adding new item:', error.message);
      throw error;
    }
  }

  async toggleCheckListItem(
    boardId: string,
    cardId: string,
    checkListId: string,
    itemId: string,
  ) {
    try {
      const boardData = await this.getBoardData(boardId);
      await this.cardService.toggleItemCheckStatus(cardId, itemId);

      const targetCard = boardData.columns
        .flatMap((column) => column.cards)
        .find((card) => card._id.toString() === cardId);

      if (!targetCard) {
        throw new NotFoundException(
          `Card with ID ${cardId} not found in board with ID ${boardId}`,
        );
      }

      const targetCheckList = targetCard.checkList.find(
        (checkList) => checkList._id.toString() === checkListId,
      );

      if (!targetCheckList) {
        throw new NotFoundException(
          `Checklist with ID ${checkListId} not found in card with ID ${cardId}`,
        );
      }

      // Encontrar el ítem en el checklist
      const targetItem = targetCheckList.checkItems.find(
        (item) => item._id.toString() === itemId,
      );

      if (!targetItem) {
        throw new NotFoundException(
          `Item with ID ${itemId} not found in checklist with ID ${checkListId}`,
        );
      }

      targetItem.isChecked = !targetItem.isChecked;

      await this.saveBoardData(boardId, boardData);

      return boardData;
    } catch (error) {
      console.error('Error toggling checklist item:', error.message);
      throw error;
    }
  }
}
