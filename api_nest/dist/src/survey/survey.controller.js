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
exports.SurveyController = void 0;
const common_1 = require("@nestjs/common");
const survey_service_1 = require("./survey.service");
const create_survey_dto_1 = require("./dto/create-survey.dto");
const jwt_guard_guard_1 = require("../../common/jwt-guard/jwt-guard.guard");
let SurveyController = class SurveyController {
    constructor(surveyService) {
        this.surveyService = surveyService;
    }
    createNewSurvey(teamId) {
        return this.surveyService.createNewSurvey(teamId);
    }
    postSurvey(createSurveyDto) {
        console.log(createSurveyDto);
        return this.surveyService.postSurvey(createSurveyDto);
    }
};
exports.SurveyController = SurveyController;
__decorate([
    (0, common_1.Post)(':teamId'),
    __param(0, (0, common_1.Param)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SurveyController.prototype, "createNewSurvey", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_survey_dto_1.CreateSurveyDto]),
    __metadata("design:returntype", void 0)
], SurveyController.prototype, "postSurvey", null);
exports.SurveyController = SurveyController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('survey'),
    __metadata("design:paramtypes", [survey_service_1.SurveyService])
], SurveyController);
//# sourceMappingURL=survey.controller.js.map