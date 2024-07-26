import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { ProductsController } from './products.controller';
import { CreateProductsUseCase } from '@useCases/products/createProduct.useCase';
import { UpdateProductUseCase } from '@useCases/products/updateProduct.useCase';

@Module({
  providers: [CreateProductsUseCase, UpdateProductUseCase],
  controllers: [ProductsController],
  imports: [DatabaseModule],
})
export class ProductsModule {}
