import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoggedUserInfo } from 'src/users/dto/logged-user.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { localStrategyPayload } from './auth.types';
import * as bcrypt from 'bcrypt';

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
    const correctPass = await bcrypt.compare(pass, user.Password);
    if (correctPass) {
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
    return {
      id: user.Id,
      name: user.Name,
      surname: user.Surname,
      phoneNumber: user.PhoneNumber,
      role: user.constructor.name,
    };
  }
}
