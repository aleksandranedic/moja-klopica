import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { localStrategyPayload } from './auth.types';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<any> {
    const user: localStrategyPayload = await this.authService.validateUser(
      email,
      password,
    ); //ovde se vraca samo id i email usera
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
