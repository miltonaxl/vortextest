import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { Question } from '../question/question.entity';
import { User } from '../user/user.entity';

export class AnswerCreateDto {
  @IsNotEmpty()
  @IsString()
  answer: string;

  qualification = 0;

  @IsNotEmpty()
  question: Question;
  user: User;
}

export class AnswerUpdateDto extends PartialType(AnswerCreateDto) {}
