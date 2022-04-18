import { Exclude } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from '../question/question.entity';
import { User } from '../user/user.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 120 })
  answer: string;

  @Column({ type: 'int', default: 0 })
  @IsInt()
  @Min(0)
  @Max(100)
  qualification: number;

  @ManyToOne(() => User, (user) => user.answers, { cascade: true })
  user: User;

  @Column({ type: 'bool', default: false })
  delete: boolean;

  @ManyToOne(() => Question, (question) => question.answers, {
    cascade: true,
  })
  question: Question;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  public updatedAt: Date;
}
