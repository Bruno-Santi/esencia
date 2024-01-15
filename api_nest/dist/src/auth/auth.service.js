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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const password_crypt_1 = require("../../common/password-crypt");
const password_compare_1 = require("../../common/password-compare");
const jwt_1 = require("@nestjs/jwt");
const team_entity_1 = require("../team/entities/team.entity");
const team_service_1 = require("../team/team.service");
let AuthService = class AuthService {
    constructor(scrumMasterModel, jwtService, teamService, teamModel) {
        this.scrumMasterModel = scrumMasterModel;
        this.jwtService = jwtService;
        this.teamService = teamService;
        this.teamModel = teamModel;
    }
    async create(createAuthDto) {
        try {
            const password = await (0, password_crypt_1.encodePassword)(createAuthDto.password);
            const newUser = await { ...createAuthDto, password };
            const user = await this.scrumMasterModel.create(newUser);
            return {
                payload: `User ${user.email} created successfully!`,
            };
        }
        catch (error) {
            if (error.code === 11000)
                throw new common_1.BadRequestException(`Email already in use`);
            console.log(error);
        }
    }
    async findOne(getUserDto) {
        try {
            const { email, password } = await getUserDto;
            const user = await this.scrumMasterModel.findOne({ email: email });
            if (!user)
                throw new common_1.BadRequestException(`Invalid email or password`);
            const passwordValid = await (0, password_compare_1.passwordCompare)(password, user.password);
            if (!passwordValid)
                throw new common_1.BadRequestException(`Invalid email or password`);
            const token = this.jwtService.sign({ sub: user._id }, { secret: process.env.JWT_SECRET_KEY });
            const teams = await this.teamService.findAllTeams(user._id);
            return {
                token: token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
                teams,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async findScrumMaster(scrumId) {
        try {
            const convertedScrumId = new mongoose_2.Types.ObjectId(scrumId);
            const scrumMaster = await this.scrumMasterModel.findOne({
                _id: convertedScrumId,
            });
            if (!scrumMaster) {
                throw new common_1.BadRequestException(`Scrum master with ${scrumId} doesn't exist`);
            }
            return true;
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.ScrumMaster.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => team_service_1.TeamService))),
    __param(3, (0, mongoose_1.InjectModel)(team_entity_1.Team.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService,
        team_service_1.TeamService,
        mongoose_2.Model])
], AuthService);
//# sourceMappingURL=auth.service.js.map