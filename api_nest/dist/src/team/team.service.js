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
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const team_entity_1 = require("./entities/team.entity");
const auth_service_1 = require("../auth/auth.service");
let TeamService = class TeamService {
    constructor(teamModel, authService) {
        this.teamModel = teamModel;
        this.authService = authService;
        this.searchScrumMaster = async (scrumId) => {
            const user = await this.authService.findScrumMaster(scrumId);
            if (!user)
                throw new common_1.BadRequestException(`User ${scrumId} doesn't exist`);
        };
        this.searchTeam = async (teamId) => {
            const convertedTeamId = new mongoose_2.Types.ObjectId(teamId);
            console.log(teamId);
            const team = await this.teamModel.findOne({ _id: teamId });
            console.log(team);
            console.log(team.sprint);
            if (!team)
                throw new common_1.BadRequestException(`Team ${teamId} doesn't exist`);
            return team;
        };
    }
    async create(createTeamDto, scrumId) {
        try {
            await this.searchScrumMaster(scrumId);
            const existingTeam = await this.teamModel.findOne({
                name: createTeamDto.name,
                scrumId: scrumId,
            });
            if (existingTeam) {
                throw new common_1.BadRequestException(`Team ${createTeamDto.name} already exists`);
            }
            const team = await this.teamModel.create({
                ...createTeamDto,
                scrumId: scrumId,
                logo: createTeamDto.logo || null,
            });
            return team;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findAllTeams(scrumId) {
        try {
            await this.searchScrumMaster(scrumId);
            const teams = await this.teamModel.find({ scrumId: scrumId });
            return teams;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(team_entity_1.Team.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_service_1.AuthService))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        auth_service_1.AuthService])
], TeamService);
//# sourceMappingURL=team.service.js.map