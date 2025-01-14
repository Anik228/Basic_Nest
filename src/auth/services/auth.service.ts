import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/Userrepository.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService, // Inject ConfigService here
  ) {}

  // Validate user credentials
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && pass === user.password) {
      const { password, ...result } = user; // Exclude password from the result
      return result;
    }
    return null;
  }

  // Generate JWT token for the user
  async login(user: any) {
    const payload = { username: user.name, sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'), // Get secret from config
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN', '3600s'), // Optional: set token expiration
      }),
    };
  }

  // Verify JWT token
  verifyToken(token: string): any {
    try {
      return this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_SECRET'), 
      });
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}



// // src/auth/auth.service.ts
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from 'src/user/repository/Userrepository.repository';

// @Injectable()
// export class AuthService {
//   constructor(
//     private readonly jwtService: JwtService,
//     @InjectRepository(UserRepository)
//     private readonly userRepository: UserRepository,
//   ) {}

//   async validateUser(email: string, pass: string): Promise<any> {
//     const user = await this.userRepository.findOne({ where: { email } });
//     if (user && pass === user.password) {
//       const { password, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { username: user.name, sub: user.id, role: user.role };
    
//     return {
//       access_token: this.jwtService.sign(payload, {
//         secret: process.env.JWT_SECRET || '1234',  
//       }),
//     };
//   }
// }
