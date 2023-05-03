import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenAuthGuard extends AuthGuard('jwt') {}
