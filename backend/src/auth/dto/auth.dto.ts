import {IsEmail, IsNotEmpty, IsString, Matches, MinLength} from 'class-validator';

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    @Matches(/[0-9]/, { message: 'Password must contain at least one number' })
    password: string;
}
