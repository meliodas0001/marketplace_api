import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';

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
import { FindAllStoreProductsUseCase } from '@useCases/products/findAllStoreProducts.useCase';
import { IUpdateProductDTO } from '@domains/dtos/products/IUpdateProductDTO';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(
    private createProductsUseCase: CreateProductsUseCase,
    private updateProductsUseCase: UpdateProductUseCase,
    private findAllStoreProductsUseCase: FindAllStoreProductsUseCase,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async create(
    @Body(new ValidatorPipe(CreateProductSchema)) body: ICreateProductDTO,
    @Res() res: Response,
  ) {
    const { category, currency, description, name, price, storeId } = body;

    const productCreated = await this.createProductsUseCase.execute({
      category,
      currency,
      description,
      name,
      price,
      storeId,
    });

    res.json(productCreated).send();
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async update(
    @Body(new ValidatorPipe(UpdateProductSchema)) body: IUpdateProductDTO,
    @Res() res: Response,
  ) {
    const { categoriesIds, id, productPrice, storeId, description, name } =
      body;

    const productUpdated = await this.updateProductsUseCase.execute({
      categoriesIds,
      id,
      productPrice,
      storeId,
      description,
      name,
    });

    res.json(productUpdated).send();
  }

  @Get('all')
  async findAll(@Body() body: any, @Res() res: Response) {
    const products = await this.findAllStoreProductsUseCase.execute(
      body.storeId,
      body.page,
      body.pageSize,
    );

    res.json(products).send();
  }
}
