import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfigService } from '@nestjs/config';


@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: 'smtp.sendgrid.net',
          port: 25,
          auth: {
            user: process.env.SEND_GRID_KEY,
            pass: process.env.SEND_GRID_PASS
          }
        },
        defaults: {
          from: 'ch.faraz324@gmail.com',
        },
       
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

