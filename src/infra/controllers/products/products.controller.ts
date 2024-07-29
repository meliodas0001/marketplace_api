import { Response } from 'express';
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
import { FindAllStoreProductsSchema } from '@validators/schemas/products/findAllStoreProductsSchema';
import { IFindAllStoreProducts } from '@domains/dtos/products/IFindAllStoreProducts';
import { FindProductsByCategory } from '@useCases/products/findProductsByCategory.useCase';
import { DeleteProductUseCase } from '@useCases/products/deleteProduct.useCase';
import { deleteProductSchema } from '@validators/schemas/products/deleteProductSchema';
import { IDeleteProduct } from '@domains/dtos/products/IDeleteProduct';
import { getProductByCategorySchema } from '@validators/schemas/category/getProductByCategorySchema';
import { IGetProductByCategory } from '@domains/dtos/products/IGetProductsByCategory';

@Controller('products')
@UseGuards(AuthGuard)
export class ProductsController {
  constructor(
    private createProductsUseCase: CreateProductsUseCase,
    private updateProductsUseCase: UpdateProductUseCase,
    private findAllStoreProductsUseCase: FindAllStoreProductsUseCase,
    private findProductByCategoryUseCase: FindProductsByCategory,
    private deleteProductUseCase: DeleteProductUseCase,
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
    const {
      categoriesIds,
      productId,
      productPrice,
      storeId,
      description,
      name,
    } = body;

    const productUpdated = await this.updateProductsUseCase.execute({
      categoriesIds,
      productId,
      productPrice,
      storeId,
      description,
      name,
    });

    res.json(productUpdated).send();
  }

  @Get('all')
  async findAll(
    @Body(new ValidatorPipe(FindAllStoreProductsSchema))
    body: IFindAllStoreProducts,
    @Res() res: Response,
  ) {
    const products = await this.findAllStoreProductsUseCase.execute(
      body.storeId,
      body.page,
      body.pageSize,
    );

    res.json(products).send();
  }

  @Get('category/all')
  async findByCategory(
    @Body(new ValidatorPipe(getProductByCategorySchema))
    body: IGetProductByCategory,
    @Res() res: Response,
  ) {
    const { categoryName, storeId, page, pageSize } = body;

    const products = await this.findProductByCategoryUseCase.execute(
      categoryName,
      storeId,
      page,
      pageSize,
    );

    res.json(products).send();
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async deleteProduct(
    @Body(new ValidatorPipe(deleteProductSchema)) body: IDeleteProduct,
    @Res() res: Response,
  ) {
    const { productId } = body;

    await this.deleteProductUseCase.execute(productId);

    res.status(204).send();
  }
}
