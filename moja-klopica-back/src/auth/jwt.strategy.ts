import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './secrets';
import { AuthService } from './auth.service';
import { LoggedUserInfo } from 'src/users/dto/logged-user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, //a string containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature (FOR PRODUCTION).
    });
  }

  async validate(payload: {
    sub: string;
    email: string;
  }): Promise<LoggedUserInfo> {
    const user: LoggedUserInfo = await this.authService.getUserInfo(
      payload.email,
    );
    if (user) return user; //Passport will build a user object based on the return value of our validate() method, and attach it as a property on the Request object. (for local and jwt strategy)
    throw new UnauthorizedException();
  }
}
