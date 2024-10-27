import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enum';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService // Inject ConfigService here
  ) {}

  canActivate(context: ExecutionContext): boolean {
    console.log("anik");

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      console.log('Authorization header missing');
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    let user;
    try {
      // Use ConfigService to get the JWT secret
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      console.log('JWT Secret:', jwtSecret); 

      user = this.jwtService.verify(token, { secret: jwtSecret });
    } catch (e) {
      console.log('Token verification failed:', e.message);
      throw new UnauthorizedException('Invalid token');
    }

    console.log('Decoded User:', user);
    return requiredRoles.some((role) => user.role === role);
  }
}
