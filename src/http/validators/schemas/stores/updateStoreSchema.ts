import * as Joi from 'joi';
import { IStoreUpdate } from '@domains/dtos/store/IStoreUpdate';

export const updateStoreSchema = Joi.object<IStoreUpdate>({
  storeId: Joi.string().required(),
  store_name: Joi.string().optional(),
  description: Joi.string().optional(),
  address: Joi.string().optional(),
  phone: Joi.string().optional(),
  ownerId: Joi.string().optional(),
});
