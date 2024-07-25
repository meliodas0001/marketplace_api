import * as Joi from 'joi';

export const CategoriesListSchema = Joi.object({
  storeId: Joi.string().uuid().required(),
});
