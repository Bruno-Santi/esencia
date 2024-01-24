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
exports.MembersService = void 0;
const common_1 = require("@nestjs/common");
const team_service_1 = require("../team/team.service");
const member_entity_1 = require("./entities/member.entity");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let MembersService = class MembersService {
    constructor(memberModel, teamService) {
        this.memberModel = memberModel;
        this.teamService = teamService;
    }
    async create(createMemberDto) {
        try {
            const convertedScrumId = new mongoose_1.Types.ObjectId(createMemberDto.teamId);
            await this.teamService.searchTeam(convertedScrumId);
            const member = await this.memberModel.find({
                email: createMemberDto.email,
                teamId: convertedScrumId,
            });
            if (member.length > 0)
                throw new common_1.BadRequestException(`Member ${createMemberDto.email} already exists`);
            await this.memberModel.create({
                ...createMemberDto,
                teamId: convertedScrumId,
            });
            return {
                created: 'ok',
                newMember: createMemberDto,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getTeamMembers(teamId) {
        try {
            const convertedTeamId = new mongoose_1.Types.ObjectId(teamId);
            if (!convertedTeamId)
                throw new common_1.BadRequestException(`The team ${teamId} doesn't exist`);
            const members = await this.memberModel
                .find({ teamId: convertedTeamId })
                .select('name email');
            return {
                members,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteTeamMember(memberId) {
        const convertedMemberId = new mongoose_1.Types.ObjectId(memberId);
        try {
            const member = await this.memberModel.findOneAndDelete(convertedMemberId);
            if (!member)
                throw new common_1.BadRequestException(`The member ${memberId} doesn't exist`);
            return { deleted: 'ok' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async deleteTeamMembers(teamId) {
        const convertedTeamId = new mongoose_1.Types.ObjectId(teamId);
        const members = await this.memberModel.deleteMany({
            teamId: convertedTeamId,
        });
        return {
            deleted: 'ok',
            members: members.deletedCount,
        };
    }
};
exports.MembersService = MembersService;
exports.MembersService = MembersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(member_entity_1.Member.name)),
    __metadata("design:paramtypes", [mongoose_1.Model,
        team_service_1.TeamService])
], MembersService);
//# sourceMappingURL=members.service.js.map