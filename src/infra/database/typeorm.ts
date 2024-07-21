require('dotenv').config();
import { DataSourceOptions } from 'typeorm';

import { ProductsPriceEntity } from './entities/productsPrice.entity';
import { ProductsEntity } from './entities/products.entity';
import { ImagesEntity } from './entities/images.entity';
import { RolesEntity } from './entities/roles.entity';
import { StoreEntity } from './entities/store.entity';
import { UserEntity } from './entities/user.entity';
import { CategoriesEntity } from './entities/categories.entity';

const configTypeorm: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    ImagesEntity,
    ProductsEntity,
    ProductsPriceEntity,
    RolesEntity,
    StoreEntity,
    UserEntity,
    CategoriesEntity,
  ],
  synchronize: true,
};

export default configTypeorm;
