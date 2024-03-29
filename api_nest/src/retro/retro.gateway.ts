import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { RetroService } from './retro.service';
import { Server, Socket } from 'socket.io';
import { log } from 'console';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/retro' })
export class RetroGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private isSendingRetro = false;
  private retroSentEmitted = false;

  constructor(private readonly retroService: RetroService) {}

  @WebSocketServer() wss: Server;

  @SubscribeMessage('saveQuestions')
  async handleSaveQuestions(
    @ConnectedSocket() client: Socket,
    @MessageBody() { team_id, questions }: any,
  ) {
    console.log('Preguntas recibidas:', questions);
    await this.retroService.saveQuestionsInMemory(team_id, questions);
    this.emitUpdates(team_id, 'questions', { team_id, questions });
    // Resto del código para guardar las preguntas...
  }

  async handleQuestions(client: Socket) {
    client.on('saveQuestions', async (data) => {
      try {
        console.log({ data: data });

        const { team_id, questions } = data;
        console.log(team_id, questions);

        await this.retroService.saveQuestionsInMemory(team_id, questions);

        this.emitUpdates(team_id, 'questions', { team_id, questions });
      } catch (error) {
        console.error('Error handling saveQuestions:', error);
      }
    });
  }

  async handleConnection(client: Socket) {
    client.on(
      'setUserId',
      async ({
        user_id,
        scrum_id,
        team_id,
      }: {
        user_id?: string;
        scrum_id?: string;
        team_id?: string;
      }) => {
        console.log(user_id, scrum_id, team_id);

        console.log(
          `Received setUserId for user_id: ${user_id}, scrum_id: ${scrum_id}, team_id: ${team_id}`,
        );

        if (!this.retroService.isClientRegistered(client)) {
          await this.handleUserConnection(client, user_id, scrum_id, team_id);
        }
      },
    );
  }

  async handleUserConnection(
    client: Socket,
    user_id?: string,
    scrum_id?: string,
    team_id?: string,
  ) {
    console.log(scrum_id);
    console.log(user_id);
    const clients = await this.retroService.getClients();

    console.log(clients);

    const userLength = this.retroService.getConnectedClients();
    console.log(userLength);

    if (user_id) {
      await this.retroService.registerClient(client, user_id);
      console.log(
        `Connected clients: ${this.retroService.getConnectedClients()}`,
      );
    }

    if (scrum_id) {
      await this.retroService.registerClient(client, scrum_id);
      console.log(
        `Connected clients: ${this.retroService.getConnectedClients()}`,
      );
    }

    console.log(`Total connected users: ${userLength}`);
    console.log(team_id);

    if (team_id) {
      if (this.retroService.isRetroStarted(team_id)) {
        client.join(team_id); // Unir al cliente a la sala con el team_id
        console.log(`Client joined room: ${team_id}`);

        // Resto del código...

        const allStickyNotes =
          await this.retroService.getAllStickyNotes(team_id);
        const allQuestions = await this.retroService.getAllQuestions(team_id);
        this.emitUpdates(team_id, 'stickyNotes', allStickyNotes);
        this.emitUpdates(team_id, 'questions', allQuestions);

        // Resto del código...
      } else {
        console.log(`Retro not started for team_id: ${team_id}`);
        // Desconectar al cliente con un mensaje de error
        return;
      }
    }
  }

  @SubscribeMessage('saveStickyNote')
  async handleSaveStickyNote(
    @MessageBody() { user_id, team_id, column, value }: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      console.log(user_id, team_id, column, value);

      await this.retroService.saveStickyNote(user_id, team_id, column, value);

      console.log("Sticky note saved. Emitting 'stickyNotesSaved' event.");
      console.log('Timestamp:', new Date().toISOString());

      // Emitir el evento solo a la sala correspondiente al team_ids
      this.emitUpdates(team_id, 'stickyNotesSaved', {
        user_id,
        team_id,
        column,
        value,
        thumb_up: 0,
        thumb_down: 0,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  private emitUpdates(room: string, event: string, data: any) {
    if (this.wss) {
      this.wss.to(room).emit(event, data);
    }
  }
  @SubscribeMessage('rateStickyNote')
  async handleRateStickyNote(
    @MessageBody() { user_id, team_id, column, vote, value }: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const updatedStickyNote = await this.retroService.rateStickyNote(
        user_id,
        team_id,
        column,
        vote,
        value,
      );
      console.log(user_id, team_id, column, vote, value);

      this.emitUpdates(team_id, 'stickyNoteRated', updatedStickyNote);
    } catch (error) {
      console.error('Error rating sticky note:', error);
    }
  }
  @SubscribeMessage('startRetro')
  async handleStartRetro(
    @ConnectedSocket() client: Socket,
    @MessageBody() { team_id }: any,
  ) {
    console.log(team_id);

    try {
      // Verificar si ya se inició una retro para el equipo
      if (this.retroService.isRetroStarted(team_id)) {
        console.log(`Retro already started for team_id: ${team_id}`);
        return;
      }
      console.log(team_id);

      await this.retroService.startRetro(team_id);
      console.log({ creandoRetro: 'ok' });

      // Emitir evento 'retroStarted'
      this.wss.to(team_id).emit('retroStarted', { team_id });

      // Manejar las preguntas después de que la retro ha comenzado
      const questions = await this.retroService.getAllQuestions(team_id); // Obtener preguntas
      this.wss.to(team_id).emit('questions', questions); // Emitir las preguntas a los clientes
    } catch (error) {
      console.error('Error starting retro:', error);
    }
  }
  @SubscribeMessage('completeRetro')
  async handleCompleteRetro(
    @MessageBody() { team_id }: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(team_id);

    try {
      this.wss.to(team_id).emit('retro_triggered');
      await this.retroService.completeRetroAndSendStickyNotes(team_id);

      this.retroService.clearTeamIdForRetro(team_id);
      this.retroService.completeRetro(team_id);
      this.wss.to(team_id).emit('retroCompleted', { team_id });

      this.wss.to(team_id).emit('completeRetroRedirect');
    } catch (error) {
      console.error('Error completing retro:', error);
    }
  }

  @SubscribeMessage('disconnectTeam')
  async handleDisconnectTeam(
    @MessageBody() { team_id }: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Disconnecting all clients from team: ${team_id}`);
    try {
      this.wss.to(team_id).emit('disconnectTeam');
    } catch (error) {
      console.error('Error disconnecting team:', error);
    }
  }

  async handleDisconnect(client: Socket) {
    try {
      if (this.retroService.isClientRegistered(client)) {
        await this.retroService.removeClient(client);
        this.emitUpdates(
          client.id,
          'clients-updated',
          this.retroService.getConnectedClients(),
        );
        console.log(`Client disconnected: ${client.id}`);
      }
    } catch (error) {
      console.error('Error handling disconnect:', error);
    }
  }

  private async emitTeamLength(team_id: string) {
    const teamLength = await this.retroService.getTeamLength(team_id);
    this.emitUpdates(team_id, 'setTeams', teamLength + 1);
  }

  @SubscribeMessage('sendRetro')
  async handleSendRetro(
    @MessageBody() { teamId }: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log({ enviandoA: teamId });

    try {
      const resp = await this.retroService.sendEmailToMembers(teamId);
      console.log('email enviado a miembros');
      console.log(resp);
    } catch (error) {
      console.log(error);
    }

    console.log('email ya enviado a miembros');
  }

  @SubscribeMessage('deleteStickyNote')
  async handleDeleteStickyNote(
    @MessageBody() { user_id, team_id, noteContent }: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(user_id, team_id, noteContent);

    try {
      await this.retroService.deleteStickyNoteByContent(
        user_id,
        team_id,
        noteContent,
      );

      const updatedStickyNotes =
        await this.retroService.getAllStickyNotes(team_id);

      this.wss.emit('stickyNoteDeleted', {
        user_id,
        team_id,
        noteContent,
        updatedStickyNotes,
      });
    } catch (error) {
      console.error('Error deleting sticky note:', error);
    }
  }
}
