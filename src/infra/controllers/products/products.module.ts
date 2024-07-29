import { Module } from '@nestjs/common';

import { DatabaseModule } from '@database/database.module';

import { ProductsController } from './products.controller';
import { CreateProductsUseCase } from '@useCases/products/createProduct.useCase';
import { UpdateProductUseCase } from '@useCases/products/updateProduct.useCase';
import { FindAllStoreProductsUseCase } from '@useCases/products/findAllStoreProducts.useCase';
import { FindProductsByCategory } from '@useCases/products/findProductsByCategory.useCase';
import { DeleteProductUseCase } from '@useCases/products/deleteProduct.useCase';

@Module({
  providers: [
    CreateProductsUseCase,
    UpdateProductUseCase,
    FindAllStoreProductsUseCase,
    FindProductsByCategory,
    DeleteProductUseCase,
  ],
  controllers: [ProductsController],
  imports: [DatabaseModule],
})
export class ProductsModule {}
