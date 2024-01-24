"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetroGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const retro_service_1 = require("./retro.service");
const socket_io_1 = require("socket.io");
let RetroGateway = class RetroGateway {
    constructor(retroService) {
        this.retroService = retroService;
        this.isSendingRetro = false;
        this.retroSentEmitted = false;
    }
    async handleConnection(client) {
        client.on('setUserId', async ({ user_id, scrum_id, team_id, }) => {
            console.log(user_id, scrum_id, team_id);
            console.log(`Received setUserId for user_id: ${user_id}, scrum_id: ${scrum_id}, team_id: ${team_id}`);
            if (!this.retroService.isClientRegistered(client)) {
                await this.handleUserConnection(client, user_id, scrum_id, team_id);
            }
        });
    }
    async handleUserConnection(client, user_id, scrum_id, team_id) {
        console.log(scrum_id);
        console.log(user_id);
        const clients = await this.retroService.getClients();
        console.log(clients);
        const userLength = this.retroService.getConnectedClients();
        if (user_id) {
            await this.retroService.registerClient(client, user_id);
            console.log(`Connected clients: ${this.retroService.getConnectedClients()}`);
        }
        if (scrum_id) {
            await this.retroService.registerClient(client, scrum_id);
            console.log(`Connected clients: ${this.retroService.getConnectedClients()}`);
        }
        console.log(`Total connected users: ${userLength}`);
        console.log(team_id);
        if (team_id) {
            if (this.retroService.isRetroStarted(team_id)) {
                client.join(team_id);
                const allStickyNotes = await this.retroService.getAllStickyNotes(team_id);
                this.wss.emit('stickyNotes', allStickyNotes);
                const user = await this.retroService.getUserById(user_id);
                if (user) {
                    console.log(user);
                    const teamId = await this.retroService.getTeamIdByUserId(user_id);
                }
                else {
                    console.log(`User not found for user_id: ${user_id}`);
                }
                this.wss.emit('userLength', this.retroService.getConnectedClients());
                const teamLength = await this.retroService.getTeamLength(team_id);
                console.log(teamLength);
                for (const clientId in clients) {
                    if (clients.hasOwnProperty(clientId)) {
                        const currentClient = clients[clientId];
                        console.log(currentClient);
                        if (currentClient === user_id || currentClient === scrum_id) {
                            console.log(true);
                        }
                    }
                }
                this.wss.emit('teamLength', teamLength);
            }
            else {
                console.log(`Retro not started for team_id: ${team_id}`);
                return;
            }
        }
    }
    async handleSaveStickyNote({ user_id, team_id, column, value }, client) {
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
        }
        catch (error) {
            console.log(error.message);
        }
    }
    async handleRateStickyNote({ user_id, team_id, column, vote, value }, client) {
        try {
            const updatedStickyNote = await this.retroService.rateStickyNote(user_id, team_id, column, vote, value);
            console.log(user_id, team_id, column, vote, value);
            this.emitUpdates(team_id, 'stickyNoteRated', updatedStickyNote);
        }
        catch (error) {
            console.error('Error rating sticky note:', error);
        }
    }
    async handleStartRetro(client, { team_id }) {
        console.log(team_id);
        try {
            if (this.retroService.isRetroStarted(team_id)) {
                console.log(`Retro already started for team_id: ${team_id}`);
                return;
            }
            console.log(team_id);
            await this.retroService.startRetro(team_id);
            console.log({ creandoRetro: 'ok' });
            this.wss.to(team_id).emit('retroStarted', { team_id });
        }
        catch (error) {
            console.error('Error starting retro:', error);
        }
    }
    async handleCompleteRetro({ team_id }, client) {
        console.log(team_id);
        try {
            await this.retroService.completeRetroAndSendStickyNotes(team_id);
            this.retroService.clearTeamIdForRetro(team_id);
            this.wss.to(team_id).emit('retroCompleted', { team_id });
            const redirectUrl = 'https://esencia.app/members/retro/finished';
            this.wss.to(team_id).emit('completeRetroRedirect', { redirectUrl });
        }
        catch (error) {
            console.error('Error completing retro:', error);
        }
    }
    async handleDisconnectTeam({ team_id }, client) {
        console.log(`Disconnecting all clients from team: ${team_id}`);
        try {
            this.wss.to(team_id).emit('disconnectTeam');
        }
        catch (error) {
            console.error('Error disconnecting team:', error);
        }
    }
    async handleDisconnect(client) {
        try {
            if (this.retroService.isClientRegistered(client)) {
                await this.retroService.removeClient(client);
                this.emitUpdates(client.id, 'clients-updated', this.retroService.getConnectedClients());
                console.log(`Client disconnected: ${client.id}`);
            }
        }
        catch (error) {
            console.error('Error handling disconnect:', error);
        }
    }
    emitUpdates(room, event, data) {
        if (this.wss) {
            this.wss.to(room).emit(event, data);
        }
    }
    async emitTeamLength(team_id) {
        const teamLength = await this.retroService.getTeamLength(team_id);
        this.emitUpdates(team_id, 'setTeams', teamLength + 1);
    }
    async handleSendRetro({ teamId }, client) {
        console.log({ enviandoA: teamId });
        try {
            const resp = await this.retroService.sendEmailToMembers(teamId);
            console.log('email enviado a miembros');
            console.log(resp);
        }
        catch (error) {
            console.log(error);
        }
        console.log('email ya enviado a miembros');
    }
    async handleDeleteStickyNote({ user_id, team_id, noteContent }, client) {
        console.log(user_id, team_id, noteContent);
        try {
            await this.retroService.deleteStickyNoteByContent(user_id, team_id, noteContent);
            const updatedStickyNotes = await this.retroService.getAllStickyNotes(team_id);
            this.wss.emit('stickyNoteDeleted', {
                user_id,
                team_id,
                noteContent,
                updatedStickyNotes,
            });
        }
        catch (error) {
            console.error('Error deleting sticky note:', error);
        }
    }
};
exports.RetroGateway = RetroGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], RetroGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('saveStickyNote'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RetroGateway.prototype, "handleSaveStickyNote", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('rateStickyNote'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RetroGateway.prototype, "handleRateStickyNote", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('startRetro'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], RetroGateway.prototype, "handleStartRetro", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('completeRetro'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RetroGateway.prototype, "handleCompleteRetro", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('disconnectTeam'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RetroGateway.prototype, "handleDisconnectTeam", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendRetro'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RetroGateway.prototype, "handleSendRetro", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('deleteStickyNote'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], RetroGateway.prototype, "handleDeleteStickyNote", null);
exports.RetroGateway = RetroGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' }, namespace: '/retro' }),
    __metadata("design:paramtypes", [retro_service_1.RetroService])
], RetroGateway);
//# sourceMappingURL=retro.gateway.js.map