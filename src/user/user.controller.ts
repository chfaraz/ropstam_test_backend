import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { User } from '@src/user/user.entity';
import { UserService } from '@src/user/user.service';
import { FindUserDto } from './dto/find-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signin')
  async findUser(@Body() findUserDto: FindUserDto): Promise<User> {
    return this.userService.signIn(findUserDto);
  }
  @Post('/signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.signUp(createUserDto);
  }
}
