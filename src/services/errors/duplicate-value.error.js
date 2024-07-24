"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateValueError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
class DuplicateValueError extends ts_custom_error_1.CustomError {
    constructor(name, property, value) {
        super(`A ${name} with ${property}: '${value}' already exists`);
    }
}
exports.DuplicateValueError = DuplicateValueError;
