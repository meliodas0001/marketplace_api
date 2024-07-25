import { IRoleUpdate } from '@domains/dtos/roles/IRoleUpdate';
import * as Joi from 'joi';

export const UpdateRolesSchema = Joi.object<IRoleUpdate>({
  storeId: Joi.string().uuid().required(),
  role: Joi.string().required(),
  updUserId: Joi.string().uuid().required(),
});
