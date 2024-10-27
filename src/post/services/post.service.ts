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

      async findUsersWithPosts(): Promise<any[]> {
        const query = `
            SELECT u.id AS userId, u.name, u.email, o.id AS postId, o.user_id AS postUserId, o.post_title, o.post_description
            FROM public.user u
            JOIN public.post o ON u.id = o.user_id;
        `;
        return this.postRepository.manager.query(query);
    }


  
}
