import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';

import { CreateUserUseCase } from '@useCases/users/createUser.useCase';

import { ICreateUserDTO } from '@domains/dtos/users/ICreateUserDTO';

import { CreateUserSchema } from '@validators/schemas/users/createUserSchema';
import { ValidatorPipe } from '@validators/validatorPipe';
import { ILoginDTO } from '@domains/dtos/users/ILoginDTO';

@Controller('users')
export class UserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  async create(
    @Body(new ValidatorPipe(CreateUserSchema)) user: ICreateUserDTO,
    @Res() res: Response,
  ): Promise<void> {
    await this.createUserUseCase.execute(user);

    res.status(201).send();
  }

  @Post('login')
  async login(@Body() user: ILoginDTO) {}
}
