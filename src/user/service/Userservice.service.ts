import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repository/Userrepository.repository';
import { CreateUserDto, UpdateUserDto} from '../dto/user.dto';
import { User } from '../entity/user.entity';

@Injectable()
export class UserServiceService {

    constructor(private readonly userRepository: UserRepository) {}

    async checkconnection(): Promise<any | Error> {
        const dt = await this.userRepository.checkDatabaseConnection();
        console.log(dt);
        return dt;

    }

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create(createUserDto);
        await this.userRepository.save(user);
        return user;
      }
    
      async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
      }
      
    
      async deleteUser(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
      }
    
      async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      async findUserById(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
      }

}
