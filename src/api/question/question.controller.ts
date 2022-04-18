import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Roles } from '../../guard/decorators/decorators.guard';
import { ApiKeyGuard } from '../../guard/api.guard';
import { Role } from '../../models/user/roles.enum';
import { User } from '../user/user.entity';
import { QuestionCreateDto, QuestionUpdateDto } from './question.dto';
import { QuestionService } from './question.service';

Role;
@Controller('questions')
@UseGuards(AuthGuard('jwt'), ApiKeyGuard)
export class QuestionController {
  constructor(private questionService: QuestionService) {}

  @Get()
  @Roles(Role.QUESTIONER, Role.ANSWER)
  find() {
    return this.questionService.findAll();
  }

  @Roles(Role.QUESTIONER)
  @Post('create')
  create(@Req() req: Request, @Body() payload: QuestionCreateDto) {
    const user = req['user'] as User;
    return this.questionService.create(user, payload);
  }

  @Patch(':questionId')
  @Roles(Role.QUESTIONER)
  updated(
    @Req() req: Request,
    @Param('questionId') questionId: string,
    @Body() payload: QuestionUpdateDto,
  ) {
    const user = req['user'] as User;
    return this.questionService.updated(user, questionId, payload);
  }

  @Get(':questionId')
  @Roles(Role.QUESTIONER, Role.ANSWER)
  findOne(@Param('questionId') questionId: string) {
    return this.questionService.findOne(questionId);
  }

  @Delete(':questionId')
  @Roles(Role.QUESTIONER)
  delete(@Req() req: Request, @Param('questionId') questionId: string) {
    const user = req['user'] as User;

    return this.questionService.deleteOne(user, questionId);
  }
}
