import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { RolesGuard } from './auth/role.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/roles.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
 
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
