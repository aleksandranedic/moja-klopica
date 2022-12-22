import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  @InjectDataSource()
  private readonly dataSource: DataSource;

  constructor(private mailService: MailService) {}

  async findOne(email: string): Promise<User> {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
    return user;
  }

  async sendConfimarionMail(user: User, token: string) {
    await this.mailService.sendUserConfirmation(user, token);
  }
}
