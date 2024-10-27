import { Module } from '@nestjs/common';
import { UserServiceService } from '../service/Userservice.service';
import { UserRepository } from '../repository/Userrepository.repository';
import { UserControllerController } from '../controller/Usercontroller.controller';
import { User } from '../entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports: [
       
    ],
    controllers: [UserControllerController],
    providers: [UserServiceService, UserRepository]
})
export class UserModuleModule {}
