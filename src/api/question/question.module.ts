import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from '../category/category.module';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), CategoryModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
