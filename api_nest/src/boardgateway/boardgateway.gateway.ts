import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BoardgatewayService } from './boardgateway.service';
import { Types } from 'mongoose';
import { BadGatewayException } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/boardgateway' })
export class BoardgatewayGateway implements OnGatewayConnection {
  constructor(private readonly boardgatewayService: BoardgatewayService) {}

  @WebSocketServer()
  server: Server;
  @SubscribeMessage('boardIdAvailable')
  async handleConnection(client: Socket) {
    const boardId = client.handshake.query.boardId;

    client.join(boardId);

    const boardData = await this.boardgatewayService.getBoardData(boardId);

    client.emit('initialBoardData', [boardData]);

    client['boardData'] = boardData;
  }

  @SubscribeMessage('newCardAdded')
  async handleNewCardAdded(client: Socket, payload: any) {
    const { newCard } = payload;
    const boardId = newCard.boardId;

    const boardData = await this.boardgatewayService.getBoardData(boardId);

    const columnToUpdate = boardData.columns.find(
      (column) => column._id === newCard.status,
    );

    if (columnToUpdate) {
      columnToUpdate.cards.push(newCard);
    }

    await this.boardgatewayService.saveBoardData(boardId, boardData);

    this.server.to(boardId).emit('boardDataUpdated', [boardData]);
  }

  @SubscribeMessage('newAssignee')
  async handleNewAssigneeAdded(client: Socket, payload: any) {
    try {
      const { newAssignee, status } = payload;
      const { cardId } = newAssignee[0];
      const boardId = newAssignee[0].boardId;
      const boardData = await this.boardgatewayService.getBoardData(
        newAssignee[0].boardId,
      );

      const newBoardData =
        await this.boardgatewayService.updateCardAssigneesInBoard(
          newAssignee[0].boardId,
          cardId,
          newAssignee,
          status,
        );

      await this.boardgatewayService.saveBoardData(
        newAssignee[0].boardId,
        boardData,
      );

      this.server.to(boardId).emit('boardDataUpdated', [newBoardData]);
    } catch (error) {
      console.error('Error handling new assignee addition:', error);
    }
  }

  @SubscribeMessage('removeAssignee')
  async handleRemoveAssignee(client: Socket, payload: any) {
    try {
      const { cardId, assigneeId } = payload;

      const newBoardData =
        await this.boardgatewayService.removeAssigneeFromCard(
          payload.dataToRemove.boardId,
          payload.dataToRemove.cardId,
          payload.dataToRemove.assigneeId,
          client,
        );

      this.server
        .to(payload.dataToRemove.boardId)
        .emit('boardDataUpdated', [newBoardData]);
    } catch (error) {
      console.error('Error handling assignee removal:', error);
    }
  }

  @SubscribeMessage('deletedCard')
  async handleDeleteCard(client: Socket, payload: any) {
    try {
      const { cardId, boardId, status } = payload.deletedCard;

      const newBoardData = await this.boardgatewayService.deleteCard(
        boardId,
        cardId,
      );

      await this.boardgatewayService.saveBoardData(boardId, newBoardData);

      this.server.to(boardId).emit('boardDataUpdated', [newBoardData]);
    } catch (error) {
      console.error('Error al manejar el evento deletedCard:', error);
    }
  }
  @SubscribeMessage('updateCardStatus')
  async handleUpdateCardStatus(client: Socket, payload: any) {
    const { cardId, newStatus, boardId } = payload;

    const convertedCardId = new Types.ObjectId(cardId);

    try {
      const boardData = await this.boardgatewayService.getBoardData(boardId);

      for (const column of boardData.columns) {
        const cardIndex = column.cards.findIndex(
          (card) => card._id.toString() === convertedCardId.toString(),
        );

        if (cardIndex !== -1) {
          const [movedCard] = column.cards.splice(cardIndex, 1);

          const newColumn = boardData.columns.find(
            (col) => col.name === newStatus,
          );

          if (newColumn) {
            newColumn.cards.push(movedCard);
          } else {
            console.error(
              'Columna no encontrada para el nuevo estado:',
              newStatus,
            );
          }
          break;
        }
      }

      await this.boardgatewayService.saveBoardData(boardId, boardData);

      this.server.to(boardId).emit('boardDataUpdated', [boardData]);

      await this.boardgatewayService.updateCardStatus(cardId, newStatus);
    } catch (error) {
      console.error(
        `Error al actualizar el estado de la tarjeta con ID ${cardId}:`,
        error,
      );
    }
  }
  @SubscribeMessage('updatedTitleDescription')
  async handleUpdatedTitleDescription(client: Socket, payload: any) {
    try {
      const { cardId, boardId, newData } = payload;

      await this.boardgatewayService.updateCardTitleAndDescription(
        cardId,
        boardId,
        newData,
      );

      const boardData = await this.boardgatewayService.getBoardData(boardId);

      this.server.to(boardId).emit('boardDataUpdated', [boardData]);
    } catch (error) {
      console.error('Error updating title and description:', error);
    }
  }

  @SubscribeMessage('addNewComment')
  async handleNewComment(client: Socket, payload: any) {
    await this.boardgatewayService.getBoardData(payload.boardId);

    try {
      const newBoardData = await this.boardgatewayService.saveNewComment(
        payload.boardId,
        payload.cardId,
        payload.comment,
      );
      this.server.to(payload.boardId).emit('boardDataUpdated', [newBoardData]);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @SubscribeMessage('addNewCheckList')
  async handleNewCheckList(client: Socket, payload: any) {
    try {
      const { boardId, cardId, checkListTitle } = payload;

      const newCheckList = await this.boardgatewayService.addNewCheckList(
        boardId,
        cardId,
        checkListTitle,
      );

      this.server.to(boardId).emit('boardDataUpdated', [newCheckList]);
    } catch (error) {
      throw new BadGatewayException(error.message);
    }
  }

  @SubscribeMessage('addNewCheckListItem')
  async handleAddNewItem(client: Socket, payload: any) {
    try {
      const { boardId, cardId, checkListId, newItemContent } = payload;

      const newItem = await this.boardgatewayService.addNewItem(
        boardId,
        cardId,
        checkListId,
        newItemContent,
      );

      this.server.to(boardId).emit('boardDataUpdated', [newItem]);
    } catch (error) {
      throw new BadGatewayException('Error adding new item');
    }
  }
  @SubscribeMessage('deleteCheckItem')
  async handleDeleteCheckItem(client: Socket, payload: any) {
    const { itemId, cardId, boardId } = payload;

    try {
      const newBoard = await this.boardgatewayService.deleteItem(
        itemId,
        cardId,
        boardId,
      );
      this.server.to(boardId).emit('boardDataUpdated', [newBoard]);
    } catch (error) {
      throw new BadGatewayException('Error deleting check item');
    }
  }

  @SubscribeMessage('deleteComment')
  async handleDeleteComment(client: Socket, payload: any) {
    const { commentId, cardId, boardId } = payload;

    try {
      const newBoard = await this.boardgatewayService.deleteComment(
        commentId,
        cardId,
        boardId,
      );
      this.server.to(boardId).emit('boardDataUpdated', [newBoard]);
    } catch (error) {
      throw new BadGatewayException('Error deleting comment');
    }
  }
  @SubscribeMessage('startTogglingItem')
  async handleStartTogglingItem(client: Socket, payload: any) {
    try {
      const { boardId, cardId, checkListId, itemId } = payload;

      const toggledItem = await this.boardgatewayService.toggleCheckListItem(
        boardId,
        cardId,
        checkListId,
        itemId,
      );

      this.server.to(boardId).emit('boardDataUpdated', [toggledItem]);
    } catch (error) {
      throw new BadGatewayException('Error toggling item');
    }
  }
}
