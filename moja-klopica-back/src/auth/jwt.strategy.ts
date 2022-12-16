import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './secrets';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret, //a string containing the secret (symmetric) or PEM-encoded public key (asymmetric) for verifying the token's signature (FOR PRODUCTION).
    });
  }

  async validate(payload: { sub: string; email: string }) {
    //vrati logged User info
    return { userId: payload.sub, email: payload.email }; //Passport will build a user object based on the return value of our validate() method, and attach it as a property on the Request object. (for local and jwt strategy)
  }
}
