import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { ProductsController } from './products.controller';
import { createProductUseCase } from '@useCases/products/createProduct.useCase';

@Module({
  providers: [createProductUseCase],
  controllers: [ProductsController],
  imports: [DatabaseModule],
})
export class ProductsModule {}
