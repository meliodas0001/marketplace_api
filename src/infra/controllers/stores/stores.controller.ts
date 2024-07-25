import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

import { Response } from 'express';

import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { IPayload } from '@domains/dtos/users/IPayload';
import { IAddUsersToStore } from '@domains/dtos/store/IAddUsersToStore';
import { RoleEnum } from '@domains/enums/RoleEnum';

import { FindStoreUsersUseCase } from '@useCases/stores/findStoreUsers.useCase';
import { CreateStoresUseCase } from '@useCases/stores/createStores.useCase';
import { UpdateStoreUseCase } from '@useCases/stores/updateStore.useCase';
import { AddUsersToStoreUseCase } from '@useCases/stores/addUsersToStore.useCase';
import { FindAllStoresUseCase } from '@useCases/stores/findAllStores.useCase';

import {
  findStoreUsersSchema,
  IFindStoreUsersSchema,
} from '@validators/schemas/stores/findStoreUsersSchema';
import { AddUsersToStoreSchema } from '@validators/schemas/stores/addUsersToStoreSchema';
import { updateStoreSchema } from '@validators/schemas/stores/updateStoreSchema';
import { CreateStoresSchema } from '@validators/schemas/stores/createStoresSchema';
import { ValidatorPipe } from '@validators/validatorPipe';

import { AuthGuard } from '@guards/auth.guard';
import { RolesGuard } from '@guards/roles.guard';

import { User } from '@decorators/user.decorator';
import { Roles } from '@decorators/roles.decorator';
import { IStoreUpdate } from '@domains/dtos/store/IStoreUpdate';
import { DeleteStoreUseCase } from '@useCases/stores/deleteStoreUseCase';
import { deleteStoreSchema } from '@validators/schemas/stores/deleteStoreSchema';
import { IRemoveUserStore } from '@domains/dtos/store/IRemoveUserStore';
import { RemoveUserStoreUseCase } from '@useCases/stores/removeUserStore.useCase';

@Controller('store')
@UseGuards(AuthGuard)
export class StoresController {
  constructor(
    private createStoresUseCase: CreateStoresUseCase,
    private findStoreUsersUseCase: FindStoreUsersUseCase,
    private findAllStoresUseCase: FindAllStoresUseCase,
    private addUsersToStoreUseCase: AddUsersToStoreUseCase,
    private updateStoreUseCase: UpdateStoreUseCase,
    private deleteStoreUseCase: DeleteStoreUseCase,
    private removeUserStoreUseCase: RemoveUserStoreUseCase,
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
  async addUsers(
    @Body(new ValidatorPipe(AddUsersToStoreSchema)) body: IAddUsersToStore,
    @Res() res: Response,
  ) {
    const { storeId, usersIds } = body;
    await this.addUsersToStoreUseCase.execute(storeId, usersIds);

    res.status(201).send();
  }

  @Put('update')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  async updateStore(
    @Body(new ValidatorPipe(updateStoreSchema)) body: IStoreUpdate,
    @Res() res: Response,
  ) {
    const { storeId, address, description, ownerId, phone, store_name } = body;

    await this.updateStoreUseCase.execute({
      storeId,
      address,
      description,
      ownerId,
      phone,
      store_name,
    });

    res.status(200).send();
  }

  @Delete('delete')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  async deleteStore(
    @Body(new ValidatorPipe(deleteStoreSchema)) body: { storeId: string },
    @User() user: IPayload,
    @Res() res: Response,
  ) {
    const { storeId } = body;

    await this.deleteStoreUseCase.execute(storeId, user.id);

    res.status(200).send();
  }

  @Delete('user')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin)
  async deleteUserFromStore(
    @Body() body: IRemoveUserStore,
    @Res() res: Response,
  ) {
    await this.removeUserStoreUseCase.execute(body.storeId, body.userId);

    res.status(200).send();
  }
}
