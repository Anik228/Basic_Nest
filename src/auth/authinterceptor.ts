// login-required.interceptor.ts
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class LoginRequiredInterceptor implements NestInterceptor {
    constructor(
      private readonly jwtService: JwtService,
      private readonly reflector: Reflector
    ) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const requireLogin = this.reflector.get<boolean>(
        'requireLogin',
        context.getHandler()
      );
  
      // If route doesn't require login, allow to proceed
      if (!requireLogin) {
        return next.handle();
      }
  
      // Check for Authorization header
      const token = request.headers.authorization?.split(' ')[1];
      if (!token) {
        throw new UnauthorizedException('Login required');
      }
  
      try {
        // Verify the JWT token
        request.user = this.jwtService.verify(token);
      } catch (error) {
        throw new UnauthorizedException('Invalid or expired token');
      }
  
      return next.handle();
    }
  }
  