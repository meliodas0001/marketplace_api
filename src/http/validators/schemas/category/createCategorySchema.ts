import * as Joi from 'joi';
import { ICreateCategory } from '@domains/dtos/categories/ICreateCategory';

export const CreateCategorySchema = Joi.object<ICreateCategory>({
  storeId: Joi.string().uuid().required(),
  name: Joi.string().required(),
});
