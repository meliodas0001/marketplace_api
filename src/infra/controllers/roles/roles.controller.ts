import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { CreateRoleUseCase } from '@useCases/roles/createRole.useCase';

import { IPayload } from '@domains/dtos/users/IPayload';

import { AuthGuard } from 'src/http/guards/auth.guard';
import { User } from 'src/http/decorators/user.decorator';

@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private createRoleUseCase: CreateRoleUseCase) {}

  @Post()
  async create(
    @Body() body: any,
    @User() user: IPayload,
    @Res() res: Response,
  ): Promise<void> {
    const { role } = body;
    const { email } = user;

    const roles = await this.createRoleUseCase.execute(role, email);

    res.json({ roles }).send();
  }
}
