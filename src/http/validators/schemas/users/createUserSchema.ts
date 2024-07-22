import * as Joi from 'joi';
import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';

export const CreateUserSchema = Joi.object<ICreateUserDTO>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
