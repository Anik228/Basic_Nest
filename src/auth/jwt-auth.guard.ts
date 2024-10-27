import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    console.log('JwtAuthGuard is being triggered');  // Add this log

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      console.log('Error in JwtAuthGuard', err, info);  // Add this log
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
