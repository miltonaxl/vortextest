import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(2)
  role: number;
}
