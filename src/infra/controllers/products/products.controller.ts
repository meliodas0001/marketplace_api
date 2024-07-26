import { Response } from 'express';
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';

import { Roles } from '@decorators/roles.decorator';

import { RoleEnum } from '@domains/enums/RoleEnum';

import { AuthGuard } from '@guards/auth.guard';
import { RolesGuard } from '@guards/roles.guard';
import { ICreateProductDTO } from '@domains/dtos/products/ICreateProducts';
import { createProductUseCase } from '@useCases/products/createProduct.useCase';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(private createProductsUseCase: createProductUseCase) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async create(@Body() body: ICreateProductDTO, @Res() res: Response) {
    const productCreated = await this.createProductsUseCase.execute(body);

    res.json(productCreated).send();
  }
}
