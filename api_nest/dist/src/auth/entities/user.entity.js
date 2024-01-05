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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrumMasterSchema = exports.ScrumMaster = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ScrumMaster = class ScrumMaster extends mongoose_2.Document {
};
exports.ScrumMaster = ScrumMaster;
__decorate([
    (0, mongoose_1.Prop)({
        unique: false,
        required: true,
    }),
    __metadata("design:type", String)
], ScrumMaster.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: true,
        required: true,
    }),
    __metadata("design:type", String)
], ScrumMaster.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        unique: false,
        required: true,
    }),
    __metadata("design:type", String)
], ScrumMaster.prototype, "password", void 0);
exports.ScrumMaster = ScrumMaster = __decorate([
    (0, mongoose_1.Schema)({ collection: 'scrumMaster' })
], ScrumMaster);
exports.ScrumMasterSchema = mongoose_1.SchemaFactory.createForClass(ScrumMaster);
//# sourceMappingURL=user.entity.js.map