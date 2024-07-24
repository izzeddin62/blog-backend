"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidator = void 0;
const celebrate_1 = require("celebrate");
exports.loginValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().email().required().trim(),
        password: celebrate_1.Joi.string().required().trim(),
    }),
});
