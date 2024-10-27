import { Module } from '@nestjs/common';
import { PostController } from './controllers/post.controller';
import { PostService } from './services/post.service';
import { PostRepository } from './repository/post.repository';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[],
  controllers: [PostController],
  providers: [PostService,PostRepository,JwtService]
})
export class PostModule {}
