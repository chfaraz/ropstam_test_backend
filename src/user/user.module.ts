import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@src/auth/auth.module';
import { MailModule } from '@src/mail/mail.module';
import { UserController } from '@src/user/user.controller';
import { UserService } from '@src/user/user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), MailModule],
  controllers: [UserController],
  providers: [ UserService],
  exports: [UserService],
})
export class UserModule {}
