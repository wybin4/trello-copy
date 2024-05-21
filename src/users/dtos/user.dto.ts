import { IsString, MinLength, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserConstants } from '../constants/USER.constant';

export class CreateUserDto {
    @ApiProperty({ description: 'Имя пользователя', minLength: 4, example: 'Иван' })
    @IsString({ message: 'Имя должно быть строкой' })
    @MinLength(4, { message: 'Имя должно составлять минимум 4 символа' })
    name: string;

    @ApiProperty({ description: UserConstants.EMAIL, example: 'eckyl@bk.ru' })
    @IsEmail({}, { message: UserConstants.EMAIL_VALID })
    email: string;

    @ApiProperty({ description: UserConstants.PASSWORD, minLength: UserConstants.PASSWORD_MIN_LEN, example: 'password123' })
    @IsString({ message: UserConstants.PASSWORD_VALID })
    @MinLength(UserConstants.PASSWORD_MIN_LEN, { message: UserConstants.PASSWORD_MIN_LEN_VALID })
    password: string;
}

export class LoginUserDto {
    @ApiProperty({ description: UserConstants.EMAIL, example: 'eckyl@bk.ru' })
    @IsEmail({}, { message: UserConstants.EMAIL_VALID })
    email: string;

    @ApiProperty({ description: UserConstants.PASSWORD, minLength: UserConstants.PASSWORD_MIN_LEN, example: 'password123' })
    @IsString({ message: UserConstants.PASSWORD_VALID })
    @MinLength(UserConstants.PASSWORD_MIN_LEN, { message: UserConstants.PASSWORD_MIN_LEN_VALID })
    password: string;
}
