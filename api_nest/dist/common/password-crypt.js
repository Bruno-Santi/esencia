"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePassword = void 0;
const bcrypt = require("bcrypt");
const encodePassword = (rawPassword) => {
    const SALTN = 10;
    const SALT = bcrypt.genSaltSync(SALTN);
    return bcrypt.hash(rawPassword, SALT);
};
exports.encodePassword = encodePassword;
//# sourceMappingURL=password-crypt.js.map