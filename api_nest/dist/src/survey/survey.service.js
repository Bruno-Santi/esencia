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
exports.SurveyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const member_entity_1 = require("../members/entities/member.entity");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const jwt_1 = require("@nestjs/jwt");
const emailData_1 = require("../../common/utils/emailData");
const survey_entity_1 = require("./entities/survey.entity");
const team_service_1 = require("../team/team.service");
const team_entity_1 = require("../team/entities/team.entity");
let SurveyService = class SurveyService {
    constructor(memberModel, surveyModel, teamModel, client, jwtService, teamService) {
        this.memberModel = memberModel;
        this.surveyModel = surveyModel;
        this.teamModel = teamModel;
        this.client = client;
        this.jwtService = jwtService;
        this.teamService = teamService;
    }
    async createNewSurvey(teamId) {
        const convertedTeamId = new mongoose_2.Types.ObjectId(teamId);
        const members = await this.memberModel.find({ teamId: convertedTeamId });
        const team = await this.teamService.searchTeam(convertedTeamId);
        console.log(team);
        try {
            for (const member of members) {
                const token = this.jwtService.sign({ sub: member._id }, { secret: process.env.JWT_SECRET_KEY });
                const convertedUserId = new mongoose_2.Types.ObjectId(member._id);
                const emailData = await (0, emailData_1.sendMail)(token, teamId, member.name, member.email, convertedUserId, team.name);
                await this.client.send(emailData);
            }
            return {
                payload: `Survey sent to ${teamId} successfully`,
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async postSurvey(createSurveyDto) {
        const convertedTeamId = new mongoose_2.Types.ObjectId(createSurveyDto.team_id);
        const convertedUserId = new mongoose_2.Types.ObjectId(createSurveyDto.user_id);
        try {
            const team = await this.teamService.searchTeam(convertedTeamId);
            const data = {
                ...createSurveyDto,
                sprint: team.sprint,
            };
            if (!team)
                throw new common_1.BadRequestException(`The team ${createSurveyDto.team_id} does not exist`);
            const resp = await axios_1.default.post(process.env.API_DATA + '/daily_survey', data);
            console.log(team.sprint);
            await this.surveyModel.create({
                ...createSurveyDto,
                userId: convertedUserId,
                teamId: convertedTeamId,
                date: new Date(),
                sprint: team.sprint,
            });
            console.log(resp);
            return {
                created: 'ok',
            };
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.SurveyService = SurveyService;
exports.SurveyService = SurveyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(member_entity_1.Member.name)),
    __param(1, (0, mongoose_1.InjectModel)(survey_entity_1.Survey.name)),
    __param(2, (0, mongoose_1.InjectModel)(team_entity_1.Team.name)),
    __param(3, (0, nestjs_sendgrid_1.InjectSendGrid)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        nestjs_sendgrid_1.SendGridService,
        jwt_1.JwtService,
        team_service_1.TeamService])
], SurveyService);
//# sourceMappingURL=survey.service.js.map