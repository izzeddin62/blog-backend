"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = exports.Reason = void 0;
const ts_custom_error_1 = require("ts-custom-error");
var Reason;
(function (Reason) {
    Reason["USER_NOT_FOUND"] = "user not found";
    Reason["WRONG_CRENDENTIALS"] = "invalid email or password";
})(Reason || (exports.Reason = Reason = {}));
class AuthenticationError extends ts_custom_error_1.CustomError {
    constructor(reason) {
        super(`Authentication failed: ${reason}`);
    }
}
exports.AuthenticationError = AuthenticationError;
