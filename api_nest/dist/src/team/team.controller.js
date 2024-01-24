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
exports.TeamController = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./team.service");
const create_team_dto_1 = require("./dto/create-team.dto");
const jwt_guard_guard_1 = require("../../common/jwt-guard/jwt-guard.guard");
const parse_mongo_id_pipe_1 = require("../../common/pipes/parse-mongo-id.pipe");
const mongoose_1 = require("mongoose");
let TeamController = class TeamController {
    constructor(teamService, JwtGuardGuard, ParseMongoIdPipe) {
        this.teamService = teamService;
        this.JwtGuardGuard = JwtGuardGuard;
        this.ParseMongoIdPipe = ParseMongoIdPipe;
    }
    create(createTeamDto, scrumId) {
        return this.teamService.create(createTeamDto, scrumId);
    }
    GetTeams(scrumId) {
        return this.teamService.findAllTeams(scrumId);
    }
};
exports.TeamController = TeamController;
__decorate([
    (0, common_1.Post)(':scrumId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('scrumId', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_team_dto_1.CreateTeamDto, mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':scrumId'),
    __param(0, (0, common_1.Param)('scrumId', parse_mongo_id_pipe_1.ParseMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_1.Types.ObjectId]),
    __metadata("design:returntype", void 0)
], TeamController.prototype, "GetTeams", null);
exports.TeamController = TeamController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('team'),
    __metadata("design:paramtypes", [team_service_1.TeamService,
        jwt_guard_guard_1.JwtAuthGuard,
        parse_mongo_id_pipe_1.ParseMongoIdPipe])
], TeamController);
//# sourceMappingURL=team.controller.js.map