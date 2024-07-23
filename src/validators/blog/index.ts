import { celebrate, Joi, Segments } from 'celebrate';

export const createBlogValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().trim(),
    content: Joi.string().required().trim(),
  })
});


export const updateBlogValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().optional().trim(),
    content: Joi.string().optional().trim(),
  }),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const getBlogValidator = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
});

export const getMyBlogsValidator = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    owner: Joi.number().required(),
  }),
});
