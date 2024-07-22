import * as Joi from 'joi';
import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';

export const CreateStoresSchema = Joi.object<IStoreCreateDTO>({
  address: Joi.string().required(),
  store_name: Joi.string().required(),
  description: Joi.string().required(),
  phone: Joi.string().required(),
});
