"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const ts_custom_error_1 = require("ts-custom-error");
class NotFound extends ts_custom_error_1.CustomError {
    constructor(name, property, value) {
        super(`A ${name} with ${property}: '${value}' not found`);
    }
}
exports.NotFound = NotFound;
