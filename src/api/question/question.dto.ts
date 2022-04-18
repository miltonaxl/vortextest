import { IsNotEmpty, IsString } from 'class-validator';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class QuestionCreateDto {
  @IsNotEmpty()
  @IsString()
  question: string;
  @IsNotEmpty()
  category: Category;
  user: User;
}

export class QuestionUpdateDto extends PartialType(QuestionCreateDto) {}
