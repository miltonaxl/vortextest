import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionService } from '../question/question.service';
import { User } from '../user/user.entity';
import { AnswerCreateDto, AnswerUpdateDto } from './answer.dto';
import { Answer } from './answer.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer) private repository: Repository<Answer>,
    private readonly questionService: QuestionService,
  ) {}

  async create(user: User, payload: AnswerCreateDto) {
    const question = await this.questionService.findOne(
      payload.question.toString(),
    );

    if (!question)
      new HttpException(
        {
          message: 'Question id not found.',
        },
        HttpStatus.BAD_REQUEST,
      );
    payload.question = question;
    payload.user = user;
    const answerCreate = await this.repository.create(payload);
    return this.repository.save(answerCreate);
  }

  async updated(user: User, answerId: string, payload: AnswerUpdateDto) {
    const question = await this.repository.findOne({
      where: {
        id: answerId,
        delete: false,
      },
    });

    return this.repository.save({ ...question, ...payload });
  }

  findOne(answerId: string) {
    return this.repository.findOne({
      where: {
        id: answerId,
        delete: false,
      },
    });
  }

  findAll() {
    return this.repository.find({
      where: {
        delete: false,
      },
    });
  }

  async deleteOne(user: User, answerId: string) {
    const answer = await this.repository.findOne({
      where: {
        id: answerId,
      },
    });

    answer.delete = true;

    return this.repository.save(answer);
  }
}
