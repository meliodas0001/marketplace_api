import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriesEntity } from '@database/entities/categories.entity';
import { ICategoriesRepository } from '@domains/repositories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  constructor(
    @InjectRepository(CategoriesEntity)
    private categoriesEntity: Repository<CategoriesEntity>,
  ) {}

  async create(name: string, storeId: string): Promise<CategoriesEntity> {
    const category = this.categoriesEntity.create({ name, storeId });
    await this.categoriesEntity.save(category);

    return category;
  }

  listCategories(storeId: string): Promise<CategoriesEntity[]> {
    return this.categoriesEntity.find({ where: { storeId } });
  }
}
