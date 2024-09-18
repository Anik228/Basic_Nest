import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserServiceService } from '../service/Userservice.service';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.dto';

@Controller('controller')
export class UserControllerController {
    constructor(private readonly userService: UserServiceService) {} 
   
  @Get('check-connection')
  checkconnection(){
  return this.userService.checkconnection()
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  // @Patch(':id')
  // async updateUser(
  //   @Param('id') id: number,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<User> {
  //   return this.userService.updateUser(id, updateUserDto);
  // }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  // @Get(':id')
  // async getUserById(@Param('id') id: number): Promise<User> {
  //   return this.userService.findUserById(id);
  // }

}
