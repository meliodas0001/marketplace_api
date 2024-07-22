import * as Joi from 'joi';
import { ICreateUserDTO } from '@domains/dtos/ICreateUserDTO';

export const CreateUserSchema = Joi.object<ICreateUserDTO>({
  name: Joi.string().email().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
