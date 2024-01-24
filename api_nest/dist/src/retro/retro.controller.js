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
exports.RetroEmailController = void 0;
const common_1 = require("@nestjs/common");
const retro_service_1 = require("./retro.service");
let RetroEmailController = class RetroEmailController {
    constructor(retroService) {
        this.retroService = retroService;
    }
    sendEmailToTeamMembers(team_id) {
        try {
            if (this.retroService.isValidTeamId(team_id)) {
                console.log(this.retroService.isValidTeamId(team_id));
                this.retroService.sendEmailToMembers(team_id);
            }
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid teamId format');
        }
        console.log(team_id);
    }
    createRetro(retroData) {
        return this.retroService.createRetro(retroData);
    }
};
exports.RetroEmailController = RetroEmailController;
__decorate([
    (0, common_1.Get)(':team_id'),
    __param(0, (0, common_1.Param)('team_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RetroEmailController.prototype, "sendEmailToTeamMembers", null);
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RetroEmailController.prototype, "createRetro", null);
exports.RetroEmailController = RetroEmailController = __decorate([
    (0, common_1.Controller)('retro-email'),
    __metadata("design:paramtypes", [retro_service_1.RetroService])
], RetroEmailController);
//# sourceMappingURL=retro.controller.js.map