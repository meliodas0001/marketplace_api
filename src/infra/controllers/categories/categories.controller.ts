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
import { Response } from 'express';

import { RoleEnum } from '@domains/enums/RoleEnum';
import { ICreateCategory } from '@domains/dtos/categories/ICreateCategory';
import { IUpdateCategory } from '@domains/dtos/categories/IUpdateCategory';

import { Roles } from '@decorators/roles.decorator';
import { RolesGuard } from '@guards/roles.guard';

import { AuthGuard } from '@guards/auth.guard';

import { ValidatorPipe } from '@validators/validatorPipe';
import { CreateCategorySchema } from '@validators/schemas/category/createCategorySchema';
import { CategoriesListSchema } from '@validators/schemas/category/categoriesListSchema';
import { UpdateCategorySchema } from '@validators/schemas/category/updateCategorySchema';

import { CreateCategoryUseCase } from '@useCases/categories/CreateCategory.useCase';
import { ListCategoriesUseCase } from '@useCases/categories/ListCategories.useCase';
import { UpdateCategoryUseCase } from '@useCases/categories/updateCategory.useCase';
import { DeleteCategoryUseCase } from '@useCases/categories/deleteCategory.useCase';
import { IDeleteCategory } from '@domains/dtos/categories/IDeleteCategory';

@Controller('categories')
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
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
  async listCategories(
    @Body(new ValidatorPipe(CategoriesListSchema)) body: { storeId: string },
    @Res() res: Response,
  ) {
    const categories = await this.listCategoriesUseCase.execute(body.storeId);

    res.json(categories).send();
  }

  @Put()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async updateCategory(
    @Body(new ValidatorPipe(UpdateCategorySchema)) body: IUpdateCategory,
    @Res() res: Response,
  ) {
    const category = await this.updateCategoryUseCase.execute(body);

    res.json(category).send();
  }

  @Delete()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async DeleteCategoryUseCase(@Body() body: IDeleteCategory, @Res() res: Response) {
    await this.deleteCategoryUseCase.execute(body.name, body.storeId)

    res.status(204).send()
  }
}
