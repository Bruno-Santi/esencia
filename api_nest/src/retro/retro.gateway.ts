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

@WebSocketGateway({ cors: true, namespace: '/retro' })
export class RetroGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly retroService: RetroService) {}

  @WebSocketServer() wss: Server;

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

      this.wss.emit('stickyNotesSaved', {
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

  @SubscribeMessage('completeRetro')
  async handleCompleteRetro(
    @MessageBody() { team_id }: any,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(team_id);

    try {
      await this.retroService.completeRetroAndSendStickyNotes(team_id);

      this.wss.to(team_id).emit('retroCompleted', { team_id });

      this.emitTeamLength(team_id);

      const redirectUrl = 'https://esencia.app/members/retro/finished';
      this.wss.to(team_id).emit('completeRetroRedirect', { redirectUrl });
    } catch (error) {
      console.error('Error completing retro:', error);
    }
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
        console.log(team_id);

        if (!this.retroService.isClientRegistered(client)) {
          console.log(`Received setUserId for ${user_id}`);
          if (user_id) {
            await this.retroService.registerClient(client, user_id);
            console.log(
              'Connected clients:',
              this.retroService.getConnectedClients(),
            );
          }
          if (scrum_id) {
            await this.retroService.registerClient(client, scrum_id);
            console.log(
              'Connected clients:',
              this.retroService.getConnectedClients(),
            );
          }

          const userLength = this.retroService.getConnectedClients();

          console.log(userLength);

          this.wss.emit('userLength', userLength);

          if (team_id) {
            client.join(team_id);
          }

          const allStickyNotes =
            await this.retroService.getAllStickyNotes(team_id);
          this.wss.emit('stickyNotes', allStickyNotes);

          const user = await this.retroService.getUserById(user_id);

          if (user) {
            console.log(user);

            const teamId = await this.retroService.getTeamIdByUserId(user_id);
          } else {
            console.log(`User not found for user_id: ${user_id}`);
          }

          if (team_id) {
            const teamLength = await this.retroService.getTeamLength(team_id);
            this.wss.emit('teamLength', teamLength);
          }
        }
      },
    );
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

  private emitUpdates(room: string, event: string, data: any) {
    if (this.wss) {
      this.wss.to(room).emit(event, data);
    }
  }

  private async emitTeamLength(team_id: string) {
    const teamLength = await this.retroService.getTeamLength(team_id);
    this.emitUpdates(team_id, 'setTeams', teamLength + 1);
  }

  @SubscribeMessage('sendRetro')
  async handleSendRetro(
    @MessageBody() { questions, teamId }: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      console.log('Received sendRetro event:', questions, teamId);
      this.retroService.sendEmailToMembers(teamId);

      this.emitUpdates(client.id, 'retroSent', { teamId });
    } catch (error) {
      console.error('Error handling sendRetro event:', error);
    }
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
      this.emitTeamLength(team_id);
    } catch (error) {
      console.error('Error deleting sticky note:', error);
    }
  }
}
