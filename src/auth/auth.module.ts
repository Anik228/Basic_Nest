import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../src/user/entity/user.entity';
import { RolesGuard } from './role.guard';
import { UserRepository } from 'src/user/repository/Userrepository.repository';
import { UserModuleModule } from 'src/user/module/Usermodule.module'; // Import UserModule

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || '1234', 
      signOptions: { expiresIn: '60m' }, 
    })
  ],
  providers: [AuthService, JwtStrategy, RolesGuard,UserRepository], 
  controllers: [AuthController],
  exports: [JwtModule]
})
export class AuthModule {}