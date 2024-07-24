"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupValidator = void 0;
const celebrate_1 = require("celebrate");
exports.signupValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        email: celebrate_1.Joi.string().email().required(),
        password: celebrate_1.Joi.string().required(),
    }),
});
