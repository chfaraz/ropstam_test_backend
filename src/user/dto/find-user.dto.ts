import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
