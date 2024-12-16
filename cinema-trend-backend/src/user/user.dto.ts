import { Gender, User } from '@prisma/client';
import { IsDateString, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  email: string;
  @IsString()
  password: string;
}

export class UpdateUserDto {
  @IsString()
  picture: string;
  @IsString()
  username: string;
  @IsString()
  gender: Gender;
  @IsDateString()
  date: string;
}

export type UserDTO = Omit<User, 'password'>;
