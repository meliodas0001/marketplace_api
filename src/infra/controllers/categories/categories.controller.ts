import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { RoleEnum } from '@domains/enums/RoleEnum';
import { ICreateCategory } from '@domains/dtos/categories/ICreateCategory';

import { Roles } from '@decorators/roles.decorator';
import { RolesGuard } from '@guards/roles.guard';

import { AuthGuard } from '@guards/auth.guard';

import { ValidatorPipe } from '@validators/validatorPipe';
import { CreateCategorySchema } from '@validators/schemas/category/createCategorySchema';

import { CreateCategoryUseCase } from '@useCases/categories/CreateCategory.useCase';

@Controller()
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

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
}
