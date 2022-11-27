import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from '@src/user/dto/create-user.dto';
import { FindUserDto } from '@src/user/dto/find-user.dto';
import { User } from '@src/user/user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@src/auth/auth.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from '@src/mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private readonly mailService: MailService,
  ) { }

  async signIn(findUserDto: FindUserDto): Promise<any> {
    console.log(findUserDto);

    const { email, password } = findUserDto;

    const found = await this.userRepository.findOne({ email: email });

    if (!found) {
      throw new NotFoundException('invalid credentials');
    }
    console.log(found);

    const isMatch = await bcrypt.compare(password, found.password);
    console.log(isMatch);

    if (!isMatch) {
      throw new NotFoundException('invalid credentials');
    }
    const token = await this.authService.login(findUserDto);
    console.log(token);

    return { email, token };
  }

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    const password = this.generatePassword();
    const saltRounds = 10;
    //send email
    this.mailService.sendEmail(createUserDto.email,
      'welcome',
      `password to login: ${password}`);
    console.log(password);

    const hash = await bcrypt.hash(password, saltRounds);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hash,
    });
    await this.userRepository.save(user);
    delete user.password
    return user;
  }
  generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
}
