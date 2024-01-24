"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRetroDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_retro_dto_1 = require("./create-retro.dto");
class UpdateRetroDto extends (0, mapped_types_1.PartialType)(create_retro_dto_1.CreateRetroDto) {
}
exports.UpdateRetroDto = UpdateRetroDto;
//# sourceMappingURL=update-retro.dto.js.map