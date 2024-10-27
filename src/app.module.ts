import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModuleModule } from './user/module/Usermodule.module';
import { User } from './user/entity/user.entity';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entity/create_post.entity';
import { AuthModule } from './auth/auth.module';
import { UserRepository } from './user/repository/Userrepository.repository';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      name: 'nest_learn',
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE, 
      autoLoadEntities: true, 
      synchronize: true,
      entities:[
        User,
        PostEntity
      ]
    }),
    UserModuleModule,
    PostModule,
    AuthModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
