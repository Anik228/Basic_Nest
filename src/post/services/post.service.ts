import { Injectable,UseGuards } from '@nestjs/common';
import { PostRepository } from '../repository/post.repository';
import { CreatePostDTO } from '../dto/create_post.dto';
import { PostEntity } from '../entity/create_post.entity';


@Injectable()
export class PostService {

    constructor(private readonly postRepository: PostRepository) {}

    async createPost(createPostDto: CreatePostDTO): Promise<PostEntity> {
        const post = this.postRepository.create(createPostDto);
        await this.postRepository.save(post);
        return post;
     }
     
    
     async findAll(): Promise<PostEntity[]> {
        return this.postRepository.find();
      }
    

}
