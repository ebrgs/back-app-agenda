import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    if (request.params.id != request.user.userId) {
      throw new UnauthorizedException('Not same user that logged');
    }
    return request.params.id == request.user.userId;
  }
}
