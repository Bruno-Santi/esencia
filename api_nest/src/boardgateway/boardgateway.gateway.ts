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
    console.log(client.handshake.query);

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
    this.server.emit('boardDataUpdated', [boardData]);
    console.log(boardData);
  }

  @SubscribeMessage('newAssignee')
  async handleNewAssigneeAdded(client: Socket, payload: any) {
    console.log(payload);

    try {
      const { newAssignee, status } = payload;
      const { cardId } = newAssignee[0];
      const boardData = await this.boardgatewayService.getBoardData(
        newAssignee[0].boardId,
      );
      console.log(boardData);
      console.log(status);
      this.server.emit('boardDataUpdated', [boardData]);

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
      console.log(boardData);
      this.server.emit('boardDataUpdated', [newBoardData]);
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

      // Emitir el evento 'boardDataUpdated' con los nuevos datos del tablero
      this.server.emit('boardDataUpdated', [newBoardData]);
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

      // Emitir evento de actualización a los clientes
      this.server.emit('boardDataUpdated', [newBoardData]);
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

      this.server.emit('boardDataUpdated', [boardData]);
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

      this.server.emit('boardDataUpdated', [boardData]);
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
      this.server.emit('boardDataUpdated', [newBoardData]);
      console.log(newBoardData);
    } catch (error) {
      console.log(error);
    }
    console.log(payload);
  }
}
