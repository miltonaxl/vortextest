import { Global, Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { CategoryModule } from './category/category.module';

@Global()
@Module({
  imports: [UserModule, QuestionModule, AnswerModule, CategoryModule],
})
export class ApiModule {}
