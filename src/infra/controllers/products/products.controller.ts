import { Response } from 'express';
import { Body, Controller, Post, Put, Res, UseGuards } from '@nestjs/common';

import { Roles } from '@decorators/roles.decorator';

import { ICreateProductDTO } from '@domains/dtos/products/ICreateProducts';
import { RoleEnum } from '@domains/enums/RoleEnum';

import { AuthGuard } from '@guards/auth.guard';
import { RolesGuard } from '@guards/roles.guard';

import { CreateProductsUseCase } from '@useCases/products/createProduct.useCase';
import { UpdateProductUseCase } from '@useCases/products/updateProduct.useCase';

import { ValidatorPipe } from '@validators/validatorPipe';
import { CreateProductSchema } from '@validators/schemas/products/createProductSchema';
import { UpdateProductSchema } from '@validators/schemas/products/updateProductSchema';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(
    private createProductsUseCase: CreateProductsUseCase,
    private updateProductsUseCase: UpdateProductUseCase,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async create(
    @Body(new ValidatorPipe(CreateProductSchema)) body: ICreateProductDTO,
    @Res() res: Response,
  ) {
    const productCreated = await this.createProductsUseCase.execute(body);

    res.json(productCreated).send();
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async update(
    @Body(new ValidatorPipe(UpdateProductSchema)) body: any,
    @Res() res: Response,
  ) {
    const productUpdated = await this.updateProductsUseCase.execute(body);

    res.json(productUpdated).send();
  }
}
