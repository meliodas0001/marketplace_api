import { IPayload } from '@domains/dtos/users/IPayload';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { CreateStoresUseCase } from '@useCases/stores/createStores.useCase';
import { Response } from 'express';
import { User } from 'src/http/decorators/user.decorator';
import { AuthGuard } from 'src/http/guards/auth.guard';

@Controller('store')
@UseGuards(AuthGuard)
export class StoresController {
  constructor(private createStoresUseCase: CreateStoresUseCase) {}

  @Post()
  async create(
    @Body() body: any,
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
