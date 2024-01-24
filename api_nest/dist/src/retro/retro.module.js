"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetroModule = void 0;
const common_1 = require("@nestjs/common");
const retro_service_1 = require("./retro.service");
const retro_gateway_1 = require("./retro.gateway");
const members_module_1 = require("../members/members.module");
const retro_controller_1 = require("./retro.controller");
const nestjs_sendgrid_1 = require("@ntegral/nestjs-sendgrid");
const team_module_1 = require("../team/team.module");
const members_service_1 = require("../members/members.service");
const mongoose_1 = require("@nestjs/mongoose");
const sticky_note_entity_1 = require("./entities/sticky-note.entity");
const mailer_1 = require("@nestjs-modules/mailer");
let RetroModule = class RetroModule {
};
exports.RetroModule = RetroModule;
exports.RetroModule = RetroModule = __decorate([
    (0, common_1.Module)({
        controllers: [retro_controller_1.RetroEmailController],
        providers: [retro_gateway_1.RetroGateway, retro_service_1.RetroService, members_service_1.MembersService],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: sticky_note_entity_1.StickyNote.name,
                    schema: sticky_note_entity_1.StickyNoteSchema,
                    collection: 'stickynotes',
                },
            ]),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.office365.com',
                    port: 587,
                    secure: false,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                    authMethod: 'PLAIN',
                },
            }),
            nestjs_sendgrid_1.SendGridModule.forRoot({
                apiKey: process.env.SENDGRID_API_KEY,
            }),
            members_module_1.MembersModule,
            team_module_1.TeamModule,
        ],
    })
], RetroModule);
//# sourceMappingURL=retro.module.js.map