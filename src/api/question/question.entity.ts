import { Exclude } from 'class-transformer';
import { Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Answer } from '../answer/answer.entity';
import { Category } from '../category/category.entity';
import { User } from '../user/user.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  @Length(160)
  question: string;

  @ManyToOne(() => User, (user) => user.questions, { cascade: true })
  user: User;

  @ManyToOne(() => Category, (category) => category.questions, {
    cascade: true,
  })
  category: Category;

  @Column({ type: 'bool', default: false })
  delete: boolean;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  public createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  @Exclude()
  public updatedAt: Date;
}
