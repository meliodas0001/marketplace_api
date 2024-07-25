import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { RoleEnum } from '@domains/enums/RoleEnum';

import { Roles } from '@decorators/roles.decorator';
import { RolesGuard } from '@guards/roles.guard';

import { AuthGuard } from '@guards/auth.guard';

import { CreateCategoryUseCase } from '@useCases/categories/CreateCategory.useCase';

@Controller()
@UseGuards(AuthGuard)
export class CategoriesController {
  constructor(private createCategoryUseCase: CreateCategoryUseCase) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(RoleEnum.Admin, RoleEnum.Moderator)
  async createCategory(@Body() body: any, @Res() res: Response) {
    const category = await this.createCategoryUseCase.execute(
      body.name,
      body.storeId,
    );

    res.json(category).send();
  }
}
