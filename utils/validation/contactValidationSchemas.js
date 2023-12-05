import Joi from "joi";

export const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" field is required`,
    "string.base": `"name" must be a text`,
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" field is required`,
    "string.base": `"email" must be a text`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" field is required`,
    "string.base": `"phone" must be a text`,
  }),
  favorite: Joi.boolean(),
});

export const contactUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.base": `"name" must be text`,
  }),
  email: Joi.string().messages({
    "string.base": `"email" must be text`,
  }),
  phone: Joi.string().messages({
    "string.base": `"phone" must be text`,
  }),
  favorite: Joi.boolean(),
});

export const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
