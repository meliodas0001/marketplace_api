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

  async listCategories(storeId: string): Promise<CategoriesEntity[]> {
    return await this.categoriesEntity.find({ where: { storeId } });
  }

  async findCategoryByName(
    name: string,
    storeId: string,
  ): Promise<CategoriesEntity> {
    return await this.categoriesEntity.findOne({ where: { name, storeId } });
  }

  async updateCategoryName(
    name: string,
    storeId: string,
  ): Promise<CategoriesEntity> {
    const category = await this.categoriesEntity.findOne({
      where: { name, storeId },
    });

    category.name = name;
    await this.categoriesEntity.save(category);

    return category;
  }

  async deleteCategory(name: string, storeId: string): Promise<void> {
    await this.categoriesEntity.delete({ name, storeId });
  }
}
