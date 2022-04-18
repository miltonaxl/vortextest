import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiKeyGuard } from 'src/guard/api.guard';
import { Roles } from '../../guard/decorators/decorators.guard';
import { Role } from '../../models/user/roles.enum';

import { CategoryService } from './category.service';

@Controller('categories')
@UseGuards(AuthGuard('jwt'), ApiKeyGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get()
  @Roles(Role.QUESTIONER, Role.ANSWER)
  findAll() {
    return this.categoryService.findAll();
  }
}
