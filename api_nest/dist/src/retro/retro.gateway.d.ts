import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { RetroService } from './retro.service';
import { Server, Socket } from 'socket.io';
export declare class RetroGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly retroService;
    private isSendingRetro;
    private retroSentEmitted;
    constructor(retroService: RetroService);
    wss: Server;
    handleConnection(client: Socket): Promise<void>;
    handleUserConnection(client: Socket, user_id?: string, scrum_id?: string, team_id?: string): Promise<void>;
    handleSaveStickyNote({ user_id, team_id, column, value }: any, client: Socket): Promise<void>;
    handleRateStickyNote({ user_id, team_id, column, vote, value }: any, client: Socket): Promise<void>;
    handleStartRetro(client: Socket, { team_id }: any): Promise<void>;
    handleCompleteRetro({ team_id }: any, client: Socket): Promise<void>;
    handleDisconnectTeam({ team_id }: any, client: Socket): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    private emitUpdates;
    private emitTeamLength;
    handleSendRetro({ teamId }: any, client: Socket): Promise<void>;
    handleDeleteStickyNote({ user_id, team_id, noteContent }: any, client: Socket): Promise<void>;
}
