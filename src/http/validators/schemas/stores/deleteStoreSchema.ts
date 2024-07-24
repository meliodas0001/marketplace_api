import * as Joi from 'joi';

export const deleteStoreSchema = Joi.object({
  storeId: Joi.string().uuid().required(),
});
