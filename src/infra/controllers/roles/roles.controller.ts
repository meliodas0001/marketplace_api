import { Body, Controller, Put, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { IPayload } from '@domains/dtos/users/IPayload';
import { IRoleUpdate } from '@domains/dtos/roles/IRoleUpdate';
import { RoleEnum } from '@domains/enums/RoleEnum';

import { AuthGuard } from 'src/http/guards/auth.guard';
import { User } from 'src/http/decorators/user.decorator';

import { RolesGuard } from '@guards/roles.guard';
import { Roles } from '@decorators/roles.decorator';

import { ValidatorPipe } from '@validators/validatorPipe';
import { UpdateRolesSchema } from '@validators/schemas/roles/updateRolesSchema';

import { UpdateRoleUseCase } from '@useCases/roles/updateRole.useCase';
@Controller('roles')
@UseGuards(AuthGuard)
export class RolesController {
  constructor(private updateRoleUseCase: UpdateRoleUseCase) {}

  @Put()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  async update(
    @Body(new ValidatorPipe(UpdateRolesSchema)) body: IRoleUpdate,
    @User() user: IPayload,
    @Res() res: Response,
  ) {
    const { storeId, role, updUserId } = body;

    await this.updateRoleUseCase.execute(user.id, storeId, role, updUserId);

    res.status(201).send();
  }
}
