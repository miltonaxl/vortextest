import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './user.dto';
import { User } from './user.entity';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(payload: UserCreateDto) {
    const user = await this.repository.findOne({
      where: {
        username: payload.username,
      },
    });
    if (user)
      throw new HttpException(
        {
          message: `User ${payload.username} was found. Please try with other username.`,
        },
        HttpStatus.NOT_ACCEPTABLE,
      );
    payload.password = await bcrypt.hash(payload.password, 10);
    const createUser = await this.repository.create(payload);
    return this.repository.save(createUser);
  }

  async authentication(username: string, password: string) {
    const user = await this.repository.findOne({
      where: {
        username,
      },
    });

    const validPassword = await bcrypt.compare(password, user.password);

    if (!user || !validPassword)
      throw new HttpException(
        {
          message: `User credentials not found.`,
        },
        HttpStatus.BAD_REQUEST,
      );

    return user;
  }

  findOne(id: string) {
    return this.repository.findOne({
      where: {
        id,
      },
    });
  }

  generateJwt(user: User) {
    const jwt = this.jwtService.sign({
      id: user.id,
      name: user.name,
      role: user.role,
    });

    return {
      token: jwt,
      user: this.buildUser(user),
    };
  }

  private buildUser(user: User) {
    return {
      id: user.id,
      fullName: `${user.name} ${user.lastName}`,
      role: user.role,
    };
  }
}
