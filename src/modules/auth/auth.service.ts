import { LoginUserDto } from './../users/dto/create-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersService.findByEmail(loginUserDto.email);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    const payload = {
      email: user.email,
      sub: user.id,
    };
    const options: JwtSignOptions = { secret: process.env.SECRET_KEY };

    return {
      access_token: this.jwtService.sign(payload, options),
    };
  }
}
