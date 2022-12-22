import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    const url = process.env.BASE_URL + `/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: 'nedicaleksandra843@gmail.com', //user.Email,
      // from: '"Support Team" <support@example.com>', // override default from
      subject: 'Dobrodošli na Moja Klopica! Potvrdi svoj Email',
      template: './confirmation', // `.hbs` extension is appended automatically
      context: {
        name: user.Name,
        url,
      },
    });
  }
}
