import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private repository: Repository<Category>,
  ) {}

  findOne(categoryId: string) {
    return this.repository.findOne({
      where: {
        id: categoryId,
      },
    });
  }

  findAll() {
    return this.repository.find();
  }
}
