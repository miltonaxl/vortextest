import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { User } from '../user/user.entity';
import { QuestionCreateDto, QuestionUpdateDto } from './question.dto';
import { Question } from './question.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question) private repository: Repository<Question>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(user: User, payload: QuestionCreateDto) {
    const category = await this.categoryService.findOne(
      payload.category.toString(),
    );

    if (!category)
      new HttpException(
        {
          message: 'Category not found!',
        },
        HttpStatus.BAD_REQUEST,
      );
    payload.user = user;
    payload.category = category;
    const questionCreate = await this.repository.create(payload);
    return this.repository.save(questionCreate);
  }

  async updated(user: User, questionId: string, payload: QuestionUpdateDto) {
    const question = await this.repository.findOne({
      where: {
        id: questionId,
        delete: false,
      },
    });
    if (!question)
      new HttpException(
        {
          message: 'Question not found. Please verify and try again.',
        },
        HttpStatus.BAD_REQUEST,
      );

    return this.repository.save({ ...question, ...payload });
  }

  findOne(questionId: string) {
    return this.repository.findOne({
      where: {
        id: questionId,
        delete: false,
      },
      relations: ['answers'],
    });
  }

  findAll() {
    return this.repository.find({
      where: {
        delete: false,
      },
    });
  }

  async deleteOne(user: User, questionId: string) {
    console.log(user, '=== ', questionId);

    const question = await this.repository.findOne({
      where: {
        id: questionId,
      },
      relations: ['answers'],
    });
    console.log(question);
    question.answers =
      question?.answers.length > 0
        ? question?.answers.map((answer) => {
            answer.delete = true;
            return answer;
          })
        : [];

    question.delete = true;

    return this.repository.save(question);
  }
}
