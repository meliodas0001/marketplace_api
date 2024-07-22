import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { IStoreCreateDTO } from '@domains/dtos/store/IStoreCreateDTO';
import { IPayload } from '@domains/dtos/users/IPayload';

import { CreateStoresUseCase } from '@useCases/stores/createStores.useCase';
import { CreateStoresSchema } from '@validators/schemas/stores/createStoresSchema';
import { ValidatorPipe } from '@validators/validatorPipe';

import { AuthGuard } from 'src/http/guards/auth.guard';
import { User } from 'src/http/decorators/user.decorator';

@Controller('store')
@UseGuards(AuthGuard)
export class StoresController {
  constructor(private createStoresUseCase: CreateStoresUseCase) {}

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
}
