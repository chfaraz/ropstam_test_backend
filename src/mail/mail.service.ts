import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendEmail(
        emailAddress: string,
        subject: string,
        data: any,
    ) {
        console.log('************************************************')
        console.log('Email is intended to send to: ' + emailAddress)
        console.log('************************************************')
        let attachComment = {
            to: emailAddress,
            subject,
            text: data,
        };

        await this.mailerService.sendMail(attachComment);
    }
}
