import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { RoleEnum } from '@domains/enums/RoleEnum';
import { ICreateCategory } from '@domains/dtos/categories/ICreateCategory';

import { Roles } from '@decorators/roles.decorator';
import { RolesGuard } from '@guards/roles.guard';

import { AuthGuard } from '@guards/auth.guard';

import { ValidatorPipe } from '@validators/validatorPipe';
import { CreateCategorySchema } from '@validators/schemas/category/createCategorySchema';
import { CategoriesListSchema } from '@validators/schemas/category/categoriesListSchema';

import { CreateCategoryUseCase } from '@useCases/categories/CreateCategory.useCase';
import { ListCategoriesUseCase } from '@useCases/categories/ListCategories.useCase';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
  ) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async createCategory(
    @Body(new ValidatorPipe(CreateCategorySchema)) body: ICreateCategory,
    @Res() res: Response,
  ) {
    const category = await this.createCategoryUseCase.execute(
      body.name,
      body.storeId,
    );

    res.json(category).send();
  }

  @Get('list')
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator, RoleEnum.User)
  async listCategories(
    @Body(new ValidatorPipe(CategoriesListSchema)) body: { storeId: string },
    @Res() res: Response,
  ) {
    const categories = await this.listCategoriesUseCase.execute(body.storeId);

    res.json(categories).send();
  }
}
