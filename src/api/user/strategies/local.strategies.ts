import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Strategy } from 'passport-local';
import { UserService } from '../user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: UserService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    });
  }
  validate(username: string, password: string) {
    return this.authService.authentication(username, password);
  }
}
