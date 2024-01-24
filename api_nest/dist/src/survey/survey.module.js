"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModule = void 0;
const common_1 = require("@nestjs/common");
const survey_service_1 = require("./survey.service");
const survey_controller_1 = require("./survey.controller");
const members_module_1 = require("../members/members.module");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const survey_entity_1 = require("./entities/survey.entity");
const team_module_1 = require("../team/team.module");
const jwt_guard_guard_1 = require("../../common/jwt-guard/jwt-guard.guard");
let SurveyModule = class SurveyModule {
};
exports.SurveyModule = SurveyModule;
exports.SurveyModule = SurveyModule = __decorate([
    (0, common_1.Module)({
        controllers: [survey_controller_1.SurveyController],
        providers: [survey_service_1.SurveyService, jwt_guard_guard_1.JwtAuthGuard],
        imports: [
            nestjs_sendgrid_1.SendGridModule.forRoot({
                apiKey: process.env.SENDGRID_API_KEY,
            }),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: survey_entity_1.Survey.name,
                    schema: survey_entity_1.surveySchema,
                    collection: 'surveys',
                },
            ]),
            jwt_1.JwtModule,
            members_module_1.MembersModule,
            team_module_1.TeamModule,
        ],
        exports: [mongoose_1.MongooseModule],
    })
], SurveyModule);
//# sourceMappingURL=survey.module.js.map