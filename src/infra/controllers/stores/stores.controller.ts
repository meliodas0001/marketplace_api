import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { IPayload } from '@domains/dtos/users/IPayload';

import { FindStoreUsersUseCase } from '@useCases/stores/findStoreUsers.useCase';
import { CreateStoresUseCase } from '@useCases/stores/createStores.useCase';

import { CreateStoresSchema } from '@validators/schemas/stores/createStoresSchema';
import { ValidatorPipe } from '@validators/validatorPipe';

import { AuthGuard } from '@guards/auth.guard';
import { RolesGuard } from '@guards/roles.guard';

import { User } from '@decorators/user.decorator';
import { Roles } from '@decorators/roles.decorator';

import { RoleEnum } from '@domains/enums/RoleEnum';
import {
  findStoreUsersSchema,
  IFindStoreUsersSchema,
} from '@validators/schemas/users/findStoreUsersSchema';
import { FindAllStoresUseCase } from '@useCases/stores/findAllStores.useCase';
import { AddUsersToStoreUseCase } from '@useCases/stores/addUsersToStore.useCase';

@Controller('store')
@UseGuards(AuthGuard)
export class StoresController {
  constructor(
    private createStoresUseCase: CreateStoresUseCase,
    private findStoreUsersUseCase: FindStoreUsersUseCase,
    private findAllStoresUseCase: FindAllStoresUseCase,
    private addUsersToStoreUseCase: AddUsersToStoreUseCase,
  ) {}

  @Post()
  async create(
    @Body(new ValidatorPipe(CreateStoresSchema)) body: IStoreCreateDTO,
    @User() user: IPayload,
    @Res() res: Response,
  ) {
    const { store_name, description, address, phone } = body;

    const store = await this.createStoresUseCase.execute(
      { store_name, description, address, phone },
      user.email,
    );

    res.json(store).send();
  }

  @Get('users')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  async findUsers(
    @Body(new ValidatorPipe(findStoreUsersSchema)) body: IFindStoreUsersSchema,
    @Res() res: Response,
  ) {
    const { storeId } = body;

    const users = await this.findStoreUsersUseCase.execute(storeId);

    res.json(users).send();
  }

  @Get('all')
  async findAll(@User() user: IPayload, @Res() res: Response) {
    const stores = await this.findAllStoresUseCase.execute(user.id);

    res.json(stores).send();
  }

  @Put('users')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async addUsers(@Body() body: any, @Res() res: Response) {
    await this.addUsersToStoreUseCase.execute(body.storeId, body.usersIds);

    res.status(201).send();
  }
}
