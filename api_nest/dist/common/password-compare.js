"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordCompare = void 0;
const bcrypt = require("bcrypt");
const passwordCompare = async (rawPassword, encodedPasswordDB) => {
    const passwordValid = await bcrypt.compareSync(rawPassword, encodedPasswordDB);
    return passwordValid;
};
exports.passwordCompare = passwordCompare;
//# sourceMappingURL=password-compare.js.map