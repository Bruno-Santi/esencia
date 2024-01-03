"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamModule = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("./team.service");
const team_controller_1 = require("./team.controller");
const jwt_guard_guard_1 = require("../../common/jwt-guard/jwt-guard.guard");
const parse_mongo_id_pipe_1 = require("../../common/pipes/parse-mongo-id.pipe");
const auth_module_1 = require("../auth/auth.module");
const mongoose_1 = require("@nestjs/mongoose");
const team_entity_1 = require("./entities/team.entity");
let TeamModule = class TeamModule {
};
exports.TeamModule = TeamModule;
exports.TeamModule = TeamModule = __decorate([
    (0, common_1.Module)({
        controllers: [team_controller_1.TeamController],
        providers: [team_service_1.TeamService, jwt_guard_guard_1.JwtAuthGuard, parse_mongo_id_pipe_1.ParseMongoIdPipe],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: team_entity_1.Team.name,
                    schema: team_entity_1.TeamSchema,
                    collection: 'teams',
                },
            ]),
            auth_module_1.AuthModule,
        ],
        exports: [team_service_1.TeamService],
    })
], TeamModule);
//# sourceMappingURL=team.module.js.map