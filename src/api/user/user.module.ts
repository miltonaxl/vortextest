import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWTStrategy } from './strategies/jwt.strategies';
import { LocalStrategy } from './strategies/local.strategies';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '2h',
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JWTStrategy],
  exports: [UserService],
})
export class UserModule {}
