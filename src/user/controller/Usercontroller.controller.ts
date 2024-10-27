import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post } from '@nestjs/common';
import { UserServiceService } from '../service/Userservice.service';
import { User } from '../entity/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Controller('controller')
export class UserControllerController {
    constructor(private readonly userService: UserServiceService) {} 
   
  @Get('check-connection')
  checkconnection(){
  return this.userService.checkconnection()
  }

  @Post('create-user')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    if (!createUserDto.name) {
      throw new BadRequestException('Name field is required');
    }
    try{
    return this.userService.createUser(createUserDto);}
    catch(error){
      console.error('Error creating user:', error); // Log the error details
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  @Patch('update-user/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Get('get-all-user')
  async getAllUser(): Promise<User[]> {
   return this.userService.findAllUsers();
  }

  @Get('get-user-by-id/:id')
  async getUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Get('get-all-user-admin-list')
  async getAll(): Promise<User[]> {
    return this.userService.findAll();
  }

}