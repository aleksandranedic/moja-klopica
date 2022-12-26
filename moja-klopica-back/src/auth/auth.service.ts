import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggedUserInfo } from 'src/users/dto/logged-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { localStrategyPayload } from './auth.types';
import { isHashCorrect } from './secrets';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<localStrategyPayload | null> {
    const user: User = await this.usersService.findOne(email);
    if (!user) return null;
    const correctPass: boolean = await isHashCorrect(pass, user.Password);
    if (correctPass && user.Verified) {
      return { email: user.Email, id: user.Id };
    }
    return null;
  }

  async login(user: localStrategyPayload) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserInfo(email: string): Promise<LoggedUserInfo> {
    const user: User = await this.usersService.findOne(email);
    if (!user) return null;
    return new LoggedUserInfo(
      user.Id,
      user.Name,
      user.Surname,
      user.PhoneNumber,
      user.constructor.name,
    );
  }

  async confirmMail(token: string) {
    const user: User | null =
      await this.usersService.findUserByConfimarionToken(token);
    if (!user)
      throw new BadRequestException("User with confirmation key doesn't exist");
    return await this.usersService.verifyAccount(user);
  }
}
