import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { CreateUserUseCase } from '@useCases/users/createUser.useCase';

import { ICreateUserDTO } from '@domains/dtos/ICreateUserDTO';

import { CreateUserSchema } from '@validators/schemas/users/createUserSchema';
import { ValidatorPipe } from '@validators/validatorPipe';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(
    @Body(new ValidatorPipe(CreateUserSchema)) user: ICreateUserDTO,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    await this.createUserUseCase.execute(user);

    res.status(201).send();
  }
}
