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

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/boardgateway' })
export class BoardgatewayGateway implements OnGatewayConnection {
  constructor(private readonly boardgatewayService: BoardgatewayService) {}

  @WebSocketServer()
  server: Server;
  @SubscribeMessage('boardIdAvailable')
  async handleConnection(client: Socket) {
    const boardId = client.handshake.query.boardId;
    console.log(boardId);

    console.log(client.handshake.query);
    client.join(boardId);
    console.log('Cliente conectado con ID:', client.id, 'y boardId:', boardId);

    // Aquí puedes cargar los datos del tablero y las tarjetas desde el servicio y enviarlos al cliente
    const boardData = await this.boardgatewayService.getBoardData(boardId);
    console.log(boardData);
    client.emit('initialBoardData', [boardData]);
    console.log(boardData);

    // Almacenar boardData como propiedad del cliente para que esté disponible en otros métodos
    client['boardData'] = boardData;
  }

  @SubscribeMessage('newCardAdded')
  async handleNewCardAdded(client: Socket, payload: any) {
    const { newCard } = payload;
    const boardId = newCard.boardId;
    console.log(newCard);

    // Obtener los datos del tablero desde el servicio
    const boardData = await this.boardgatewayService.getBoardData(boardId);

    // Encontrar la columna correspondiente
    const columnToUpdate = boardData.columns.find(
      (column) => column._id === newCard.status,
    );

    // Agregar la nueva tarjeta a la columna correspondiente
    if (columnToUpdate) {
      columnToUpdate.cards.push(newCard);
    }

    // Guardar los cambios en el servicio
    await this.boardgatewayService.saveBoardData(boardId, boardData);
    console.log(boardId);

    // Emitir el evento 'boardDataUpdated' a todos los clientes suscritos al tablero
    this.server.to(boardId).emit('boardDataUpdated', [boardData]);
    console.log(boardData);
  }

  @SubscribeMessage('newAssignee')
  async handleNewAssigneeAdded(client: Socket, payload: any) {
    console.log(payload);

    try {
      const { newAssignee, status } = payload;
      const { cardId } = newAssignee[0];
      const boardId = newAssignee[0].boardId;
      const boardData = await this.boardgatewayService.getBoardData(
        newAssignee[0].boardId,
      );
      console.log(boardData);
      console.log(status);

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
      console.log(boardId);

      this.server.to(boardId).emit('boardDataUpdated', [newBoardData]);
    } catch (error) {
      console.error('Error handling new assignee addition:', error);
    }
  }

  @SubscribeMessage('removeAssignee')
  async handleRemoveAssignee(client: Socket, payload: any) {
    console.log(payload);

    try {
      const { cardId, assigneeId } = payload;
      console.log(payload);

      // Lógica para eliminar el asignado de la tarjeta
      // Suponiendo que tienes un servicio llamado boardgatewayService que maneja la lógica del tablero
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

      // Obtener datos de la tarjeta eliminada (opcional)
      const newBoardData = await this.boardgatewayService.deleteCard(
        boardId,
        cardId,
      );

      await this.boardgatewayService.saveBoardData(boardId, newBoardData);

      this.server.to(boardId).emit('boardDataUpdated', [newBoardData]);
      console.log(newBoardData);

      console.log(`Tarjeta con ID ${cardId} eliminada exitosamente.`);
    } catch (error) {
      console.error('Error al manejar el evento deletedCard:', error);
    }
  }
  @SubscribeMessage('updateCardStatus')
  async handleUpdateCardStatus(client: Socket, payload: any) {
    const { cardId, newStatus, boardId } = payload;
    console.log(payload);
    const convertedCardId = new Types.ObjectId(cardId);
    console.log('Converted Card Id:', convertedCardId);

    try {
      const boardData = await this.boardgatewayService.getBoardData(boardId);
      console.log('Board Data:', boardData);

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
      console.log(boardData.columns);
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
      console.log(boardData);
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
      console.log(newBoardData);
    } catch (error) {
      console.log(error);
    }
    console.log(payload);
  }

  @SubscribeMessage('addNewCheckList')
  async handleNewCheckList(client: Socket, payload: any) {
    try {
      const { boardId, cardId, checkListTitle } = payload;
      console.log(boardId, cardId, checkListTitle);

      // Guardar el nuevo checklist usando el servicio correspondiente
      const newCheckList = await this.boardgatewayService.addNewCheckList(
        boardId,
        cardId,
        checkListTitle,
      );

      this.server.to(boardId).emit('boardDataUpdated', [newCheckList]);
      console.log('New checklist added:', newCheckList);
    } catch (error) {
      console.error('Error adding new checklist:', error);
    }
  }

  @SubscribeMessage('addNewCheckListItem')
  async handleAddNewItem(client: Socket, payload: any) {
    try {
      const { boardId, cardId, checkListId, newItemContent } = payload;
      console.log(boardId, cardId, checkListId, newItemContent);

      // Guardar el nuevo ítem en el checklist usando el servicio correspondiente
      const newItem = await this.boardgatewayService.addNewItem(
        boardId,
        cardId,
        checkListId,
        newItemContent,
      );

      this.server.to(boardId).emit('boardDataUpdated', [newItem]);
      console.log('New item added:', newItem);
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  }

  @SubscribeMessage('startTogglingItem')
  async handleStartTogglingItem(client: Socket, payload: any) {
    try {
      const { boardId, cardId, checkListId, itemId } = payload;
      console.log(boardId, cardId, checkListId, itemId);

      // Toggle the item's isChecked property using the corresponding service method
      const toggledItem = await this.boardgatewayService.toggleCheckListItem(
        boardId,
        cardId,
        checkListId,
        itemId,
      );

      this.server.to(boardId).emit('boardDataUpdated', [toggledItem]);
      console.log('Item toggled successfully:', toggledItem);
    } catch (error) {
      console.error('Error toggling item:', error);
    }
  }
}
