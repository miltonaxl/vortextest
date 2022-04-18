import { Exclude } from 'class-transformer';
import { Length, Max, Min } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { Question } from '../question/question.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  @Length(160)
  name: string;

  @Column({ type: 'varchar' })
  @Length(160)
  lastName: string;

  @Column({ type: 'varchar' })
  @Length(160)
  username: string;

  @Column({ type: 'varchar' })
  @Length(160)
  password: string;

  @Column({ type: 'int' })
  @Min(1)
  @Max(2)
  role: number;

  @OneToMany(() => Answer, (answer) => answer.user)
  answers: Answer[];

  @OneToMany(() => Question, (question) => question.user)
  questions: Question[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  public updatedAt: Date;
}
