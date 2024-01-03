import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new BadRequestException(`You must provide a token`);
    }

    try {
      const decoded = this.jwtService.verify(token.replace('Bearer ', ''));
      request.user = decoded;
      return true;
    } catch (error) {
      throw new BadRequestException(`Invalid token`);
    }
  }
}
