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
exports.surveySchema = exports.Survey = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let Survey = class Survey extends mongoose_2.Document {
};
exports.Survey = Survey;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Survey.prototype, "team_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Survey.prototype, "user_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false }),
    __metadata("design:type", Number)
], Survey.prototype, "sprint", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: false }),
    __metadata("design:type", Object)
], Survey.prototype, "comment", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Survey.prototype, "question1", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Survey.prototype, "question2", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Survey.prototype, "question3", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, required: true }),
    __metadata("design:type", Object)
], Survey.prototype, "question4", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Survey.prototype, "date", void 0);
exports.Survey = Survey = __decorate([
    (0, mongoose_1.Schema)({ collection: 'surveys' })
], Survey);
exports.surveySchema = mongoose_1.SchemaFactory.createForClass(Survey);
//# sourceMappingURL=survey.entity.js.map