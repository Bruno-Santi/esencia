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
exports.DataService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("axios");
const mongoose_2 = require("mongoose");
const team_entity_1 = require("../team/entities/team.entity");
let DataService = class DataService {
    constructor(teamModel) {
        this.teamModel = teamModel;
    }
    async getLongRecommendation(teamId) {
        try {
            await this.checkTeam(teamId);
            const longRecommendation = await axios_1.default.get(`https://us-central1-esencia-app.cloudfunctions.net/get_long_recommendation?team_id=${teamId}`);
            const { data } = longRecommendation;
            return {
                data,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getDashboardData(teamId) {
        try {
            await this.checkTeam(teamId);
            const dashboardData = await axios_1.default.get(`https://us-central1-esencia-app.cloudfunctions.net/dashboard_data?team_id=${teamId}`);
            const { data } = dashboardData;
            return {
                data,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async checkTeam(teamId) {
        const convertedTeamId = new mongoose_2.Types.ObjectId(teamId);
        try {
            const team = await this.teamModel.findById(convertedTeamId);
            if (!team)
                throw new common_1.BadRequestException(`Team ${teamId} does not exist`);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.DataService = DataService;
exports.DataService = DataService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(team_entity_1.Team.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], DataService);
//# sourceMappingURL=data.service.js.map