import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable } from '@nestjs/common';

interface iPayload {
  email: string;
  sub: string;
}

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  async validate(payload: iPayload) {
    const { sub } = payload;
    return { userId: sub };
  }
}
