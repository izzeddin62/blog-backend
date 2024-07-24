"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyBlogsValidator = exports.getBlogValidator = exports.updateBlogValidator = exports.createBlogValidator = void 0;
const celebrate_1 = require("celebrate");
exports.createBlogValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        title: celebrate_1.Joi.string().required().trim(),
        content: celebrate_1.Joi.string().required().trim(),
    })
});
exports.updateBlogValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.BODY]: celebrate_1.Joi.object().keys({
        title: celebrate_1.Joi.string().optional().trim(),
        content: celebrate_1.Joi.string().optional().trim(),
    }),
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.number().required(),
    }),
});
exports.getBlogValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.PARAMS]: celebrate_1.Joi.object().keys({
        id: celebrate_1.Joi.number().required(),
    }),
});
exports.getMyBlogsValidator = (0, celebrate_1.celebrate)({
    [celebrate_1.Segments.QUERY]: celebrate_1.Joi.object().keys({
        owner: celebrate_1.Joi.number().required(),
    }),
});
