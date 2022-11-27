import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UserService } from '@src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { FindUserDto } from '@src/user/dto/find-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(createUserDto: FindUserDto): Promise<any> {
    const user = await this.userService.signIn(createUserDto);
    if (user) {
      return user;
    }
    return null;
  }

  async login(user: FindUserDto) {
    const payload = { email: user.email };
   
    return this.jwtService.sign(payload,{
      secret:process.env.JWT_SECRET
    });
  }
}
