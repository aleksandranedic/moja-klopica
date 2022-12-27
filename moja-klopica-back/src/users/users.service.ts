import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { generateToken } from 'src/auth/secrets';

@Injectable()
export class UsersService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;
  @InjectDataSource()
  private readonly dataSource: DataSource;

  constructor(private mailService: MailService) {}

  async findOne(email: string): Promise<User> {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }

  async findUserByConfimarionToken(token: string) {
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .where('user.confimationToken = :confimationToken', {
        confimationToken: token,
      })
      .getOne();
    return user;
  }

  async sendConfimarionMail(user: User) {
    const token = generateToken();
    await this.mailService.sendUserConfirmation(user, token);
    return token;
  }

  async verifyAccount(user: User) {
    //ako je korisnik vec verifikovan, da li treba izbaciti gresku?
    user.Verified = true;
    this.repository.save(user);
    return true;
  }
}
