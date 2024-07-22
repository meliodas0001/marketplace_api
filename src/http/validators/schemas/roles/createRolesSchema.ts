import * as Joi from 'joi';
import { IRoleCreate } from '@domains/dtos/roles/IRoleCreate';

export const CreateRolesSchema = Joi.object<IRoleCreate>({
  role: Joi.string().equal('Admin', 'Moderator', 'User').required(),
  storeId: Joi.string().required(),
});
