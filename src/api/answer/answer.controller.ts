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
import { ApiKeyGuard } from '../../guard/api.guard';
import { Roles } from '../../guard/decorators/decorators.guard';
import { Role } from '../../models/user/roles.enum';
import { User } from '../user/user.entity';
import { AnswerCreateDto, AnswerUpdateDto } from './answer.dto';
import { AnswerService } from './answer.service';

@Controller('answer')
@UseGuards(AuthGuard('jwt'), ApiKeyGuard)
export class AnswerController {
  constructor(private answerService: AnswerService) {}

  @Get()
  @Roles(Role.QUESTIONER, Role.ANSWER)
  find() {
    return this.answerService.findAll();
  }

  @Post('create')
  @Roles(Role.ANSWER)
  create(@Req() req: Request, @Body() payload: AnswerCreateDto) {
    const user = req['user'] as User;
    return this.answerService.create(user, payload);
  }

  @Patch('/ :answerId')
  @Roles(Role.ANSWER)
  updated(
    @Req() req: Request,
    @Param('answerId') answerId: string,
    @Body() payload: AnswerUpdateDto,
  ) {
    const user = req['user'] as User;
    return this.answerService.updated(user, answerId, payload);
  }

  @Get(':answerId')
  @Roles(Role.QUESTIONER, Role.ANSWER)
  findOne(@Param('answerId') answerId: string) {
    return this.answerService.findOne(answerId);
  }

  @Delete(':answerId')
  @Roles(Role.ANSWER)
  delete(@Req() req: Request, @Param('answerId') answerId: string) {
    const user = req['user'] as User;

    return this.answerService.deleteOne(user, answerId);
  }
}
