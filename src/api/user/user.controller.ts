import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserCreateDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  auth(@Req() req: Request) {
    const user = req['user'] as User;
    return this.userService.generateJwt(user);
  }

  @Post('register')
  register(@Body() payload: UserCreateDto) {
    return this.userService.register(payload);
  }
}
