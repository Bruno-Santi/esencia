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
exports.DataController = void 0;
const common_1 = require("@nestjs/common");
const data_service_1 = require("./data.service");
const jwt_guard_guard_1 = require("../../common/jwt-guard/jwt-guard.guard");
let DataController = class DataController {
    constructor(dataService) {
        this.dataService = dataService;
    }
    getLong(teamId) {
        return this.dataService.getLongRecommendation(teamId);
    }
    getDashData(teamId) {
        return this.dataService.getDashboardData(teamId);
    }
};
exports.DataController = DataController;
__decorate([
    (0, common_1.Get)('/get_long_recommendation/:teamid'),
    __param(0, (0, common_1.Param)('teamid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "getLong", null);
__decorate([
    (0, common_1.Get)('/dashboard-data/:teamid'),
    __param(0, (0, common_1.Param)('teamid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DataController.prototype, "getDashData", null);
exports.DataController = DataController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('data'),
    __metadata("design:paramtypes", [data_service_1.DataService])
], DataController);
//# sourceMappingURL=data.controller.js.map