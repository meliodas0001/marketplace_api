import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { ProductsController } from './products.controller';
import { CreateProductsUseCase } from '@useCases/products/createProduct.useCase';

@Module({
  providers: [CreateProductsUseCase],
  controllers: [ProductsController],
  imports: [DatabaseModule],
})
export class ProductsModule {}
