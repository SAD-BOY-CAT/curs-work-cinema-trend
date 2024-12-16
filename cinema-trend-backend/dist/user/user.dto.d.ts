import { Gender, User } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
}
export declare class UpdateUserDto {
    picture: string;
    username: string;
    gender: Gender;
    date: string;
}
export type UserDTO = Omit<User, 'password'>;
