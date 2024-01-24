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
exports.RetroService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const team_service_1 = require("../team/team.service");
const jwt_1 = require("@nestjs/jwt");
const emailRetro_1 = require("../../common/utils/emailRetro");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const members_service_1 = require("../members/members.service");
const mongoose_2 = require("@nestjs/mongoose");
const member_entity_1 = require("../members/entities/member.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const team_entity_1 = require("../team/entities/team.entity");
let RetroService = class RetroService {
    constructor(mailerService, teamService, memberService, jwtService, memberModel, teamModel, sendGrid) {
        this.mailerService = mailerService;
        this.teamService = teamService;
        this.memberService = memberService;
        this.jwtService = jwtService;
        this.memberModel = memberModel;
        this.teamModel = teamModel;
        this.sendGrid = sendGrid;
        this.connectedClients = new Map();
        this.stickyNotes = new Map();
        this.retros = new Map();
        this.scrumMasterTeamMap = {};
        this.retroStartedTeams = new Set();
        this.isValidTeamId = (team_id) => {
            return mongoose_1.Types.ObjectId.isValid(team_id);
        };
    }
    async registerClient(client, user_id) {
        this.connectedClients.set(client.id, user_id);
    }
    removeClient(client) {
        this.connectedClients.delete(client.id);
    }
    async getStickyNote(user_id, team_id, column, value) {
        const teamNotes = this.stickyNotes.get(team_id);
        if (!teamNotes) {
            return undefined;
        }
        const columnNotes = teamNotes.get(column);
        if (!columnNotes) {
            return undefined;
        }
        return columnNotes.find((note) => note.user_id === user_id && note.value === value);
    }
    isClientRegistered(client) {
        return this.connectedClients.has(client.id);
    }
    getConnectedClients() {
        return this.connectedClients.size;
    }
    getClients() {
        return this.connectedClients;
    }
    getClientUserId(client) {
        return this.connectedClients.get(client.id);
    }
    startRetro(teamId) {
        this.retroStartedTeams.add(teamId);
        console.log(this.retros);
    }
    async completeRetro(teamId) {
        this.stickyNotes.delete(teamId);
        this.retroStartedTeams.delete(teamId);
        this.connectedClients.clear();
        this.retros.delete(teamId);
    }
    isRetroStarted(teamId) {
        const team_id = teamId.toString();
        console.log(this.retroStartedTeams.has(team_id));
        return this.retroStartedTeams.has(team_id);
    }
    async createRetro(data) {
        console.log(data);
        try {
            const { token, team_id, scrum_id } = data;
            this.startRetro(team_id);
            console.log(scrum_id);
            const convertedTeamId = new mongoose_1.Types.ObjectId(team_id);
            const tokenWithoutQuotes = token.replace(/^"|"$/g, '');
            const team = await this.teamService.searchTeam(convertedTeamId);
            console.log(team);
            if (team) {
                const { scrumId } = team;
                this.scrumMasterTeamMap[scrumId] = team_id;
                const teamIdString = team_id.toString();
                this.retros.set(teamIdString, teamIdString);
                console.log(this.retros);
            }
            const retroUrl = `http://localhost:5173/members/retro?token=${tokenWithoutQuotes}&team_id=${team_id}&scrum_id=${scrum_id}`;
            console.log(retroUrl);
            return retroUrl;
        }
        catch (error) {
            console.log(error);
        }
    }
    clearTeamIdForRetro(team_id) {
        console.log(team_id);
        this.retroStartedTeams.delete(team_id);
    }
    async rateStickyNote(user_id, team_id, column, vote, value) {
        const stickyNote = this.findStickyNote(user_id, team_id, column, value) ||
            this.createStickyNote(user_id, team_id, column, value);
        const existingVoteIndex = stickyNote.votes.findIndex((v) => v.user_id === user_id);
        if (existingVoteIndex !== -1) {
            const existingVote = stickyNote.votes[existingVoteIndex];
            stickyNote.votes.splice(existingVoteIndex, 1);
            if (existingVote.value === 'thumb_up') {
                stickyNote.thumb_up = Math.max(0, stickyNote.thumb_up - 1);
            }
            else if (existingVote.value === 'thumb_down') {
                stickyNote.thumb_down = Math.max(0, stickyNote.thumb_down - 1);
            }
        }
        stickyNote.votes.push({
            user_id,
            value: vote,
        });
        if (vote === 'thumb_up') {
            stickyNote.thumb_up += 1;
            console.log(stickyNote);
        }
        else if (vote === 'thumb_down') {
            stickyNote.thumb_down += 1;
            console.log(stickyNote);
        }
        console.log(this.stickyNotes);
        return stickyNote;
    }
    saveStickyNote(user_id, team_id, column, value) {
        const newStickyNote = {
            user_id,
            team_id,
            column,
            value,
            thumb_up: 0,
            thumb_down: 0,
            votes: [],
        };
        this.updateStickyNotesInMemory(team_id, column, newStickyNote);
        return { message: 'Sticky note saved successfully' };
    }
    getAllStickyNotes(team_id) {
        const stickyNotesMap = this.stickyNotes.get(team_id);
        const allStickyNotes = [];
        if (stickyNotesMap) {
            stickyNotesMap.forEach((notes, column) => {
                allStickyNotes.push(...notes);
            });
        }
        return allStickyNotes;
    }
    async completeRetroAndSendStickyNotes(team_id) {
        const stickyNotesMap = this.stickyNotes.get(team_id);
        const convertedTeamId = new mongoose_1.Types.ObjectId(team_id);
        try {
            const resp = await this.teamModel.findOneAndUpdate(convertedTeamId, { $inc: { sprint: 1 } }, { new: true });
            console.log(resp);
        }
        catch (error) {
            console.log(error);
        }
        finally {
            const allColumns = ['c1', 'c2', 'c3', 'c4'];
            const formattedStickyNotes = Object.fromEntries(allColumns.map((column) => [
                column,
                (stickyNotesMap?.get(column) || []).map(({ value, thumb_up, thumb_down }) => ({
                    value,
                    thumb_up,
                    thumb_down,
                })),
            ]));
            console.log({ ...formattedStickyNotes });
        }
    }
    updateStickyNotesInMemory(team_id, column, newStickyNote) {
        if (!this.stickyNotes.has(team_id)) {
            this.stickyNotes.set(team_id, new Map());
        }
        const teamNotesMap = this.stickyNotes.get(team_id);
        if (!teamNotesMap.has(column)) {
            teamNotesMap.set(column, []);
        }
        const columnNotes = teamNotesMap.get(column);
        columnNotes.push(newStickyNote);
    }
    findStickyNote(user_id, team_id, column, value) {
        const stickyNotesMap = this.stickyNotes.get(team_id);
        if (stickyNotesMap && stickyNotesMap.has(column)) {
            const columnNotes = stickyNotesMap.get(column);
            return columnNotes.find((note) => note.value === value && note.column === column);
        }
        return undefined;
    }
    async sendEmailToMembers(teamId) {
        console.log({ este: teamId });
        this.isValidTeamId(teamId);
        try {
            const teams = await this.teamService.searchTeam(teamId);
            if (teams) {
                console.log(teams);
                const convertedTeamId = new mongoose_1.Types.ObjectId(teamId);
                const members = await this.memberModel.find({
                    teamId: convertedTeamId,
                });
                console.log(members);
                if (members) {
                    for (const member of members) {
                        const token = this.jwtService.sign({ sub: member._id }, { secret: process.env.JWT_SECRET_KEY });
                        const convertedUserId = new mongoose_1.Types.ObjectId(member._id);
                        console.log({ UserId: convertedUserId });
                        const emailData = await (0, emailRetro_1.sendRetroMail)(token, teamId, member.name, member.email, convertedUserId);
                        await this.sendGrid.send(emailData);
                    }
                }
            }
            return {
                message: `Retro sent to team: ${teamId}`,
            };
        }
        catch (error) {
            console.log(error);
        }
    }
    async getTeamLength(teamId) {
        console.log(teamId);
        const convertedTeamId = new mongoose_1.Types.ObjectId(teamId);
        const teams = await this.memberModel.find({ teamId: convertedTeamId });
        console.log(Object.keys(teams).length);
        return Object.keys(teams).length + 1;
    }
    async getTeamIdByUserId(user_id) {
        try {
            const convertedUserId = new mongoose_1.Types.ObjectId(user_id);
            const member = await this.memberModel.findById(convertedUserId);
            if (member) {
                const { teamId } = member;
                return teamId;
            }
            else {
                throw new Error(`Member not found for user_id: ${user_id}`);
            }
        }
        catch (error) {
            console.error(`Error getting teamId by userId: ${error.message}`);
            throw error;
        }
    }
    async getUserById(user_id) {
        console.log(user_id);
        if (user_id && user_id !== 'null') {
            try {
                const convertedUserId = new mongoose_1.Types.ObjectId(user_id);
                const member = await this.memberModel.findById(convertedUserId);
                return member;
            }
            catch (error) {
                console.log(error);
            }
        }
        return;
    }
    async deleteStickyNoteByContent(user_id, team_id, noteContent) {
        try {
            if (!this.isValidTeamId(team_id)) {
                throw new common_1.BadRequestException('Invalid teamId');
            }
            const stickyNotesMap = this.stickyNotes.get(team_id);
            if (stickyNotesMap) {
                stickyNotesMap.forEach((notes, column) => {
                    const indexToDelete = notes.findIndex((note) => note.value === noteContent && note.user_id === user_id);
                    if (indexToDelete !== -1) {
                        notes.splice(indexToDelete, 1);
                    }
                });
            }
        }
        catch (error) {
            console.error('Error deleting sticky note by content:', error);
            throw error;
        }
    }
    createStickyNote(user_id, team_id, column, value) {
        const newStickyNote = {
            user_id,
            team_id,
            column,
            value,
            thumb_up: 0,
            thumb_down: 0,
            votes: [],
        };
        this.updateStickyNotesInMemory(team_id, column, newStickyNote);
        return newStickyNote;
    }
};
exports.RetroService = RetroService;
exports.RetroService = RetroService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.DEFAULT }),
    __param(4, (0, mongoose_2.InjectModel)(member_entity_1.Member.name)),
    __param(5, (0, mongoose_2.InjectModel)(team_entity_1.Team.name)),
    __param(6, (0, nestjs_sendgrid_1.InjectSendGrid)()),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        team_service_1.TeamService,
        members_service_1.MembersService,
        jwt_1.JwtService,
        mongoose_1.Model,
        mongoose_1.Model,
        nestjs_sendgrid_1.SendGridService])
], RetroService);
//# sourceMappingURL=retro.service.js.map