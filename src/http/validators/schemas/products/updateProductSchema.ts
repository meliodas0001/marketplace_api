import { IUpdateProductDTO } from '@domains/dtos/products/IUpdateProductDTO';
import * as Joi from 'joi';

export const UpdateProductSchema = Joi.object<IUpdateProductDTO>({
  id: Joi.string().required(),
  storeId: Joi.string().required(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  categoriesIds: Joi.array().items(Joi.string()).required(),

  productPrice: Joi.object({
    currency: Joi.string().equal('BRL', 'EUR', 'USD').optional(),
    amount: Joi.number().optional(),
  }).required(),
});
