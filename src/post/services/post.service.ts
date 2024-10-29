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
            SELECT u.id AS userid, u.name, u.email, o.id AS postid, o.user_id AS postuserid, o.post_title, o.post_description
            FROM public.user u
            JOIN public.post o ON u.id = o.user_id;
        `;
    
        // Await the data retrieval
        const data = await this.postRepository.manager.query(query);
        const usersMap = new Map();
    
        data.forEach(item => {
            const { userid, name, email, postid, postuserid, post_title, post_description } = item;
    
            // Initialize the user object in the map if it doesn't exist
            if (!usersMap.has(userid)) {
                usersMap.set(userid, {
                    userid,
                    name,
                    email,
                    posts: []
                });
            }
    
            // Add the post to the user's posts array if userid matches postuserid
            if (userid === postuserid) {
                usersMap.get(userid).posts.push({
                    postid,
                    postuserid,
                    post_title,
                    post_description
                });
            }
        });
    
        return Array.from(usersMap.values());
    }

    async findUsersWithPostsWithoutPost(): Promise<any[]> {
        const query = `
            SELECT u.id AS userid, u.name, u.email, 
                   o.id AS postid, o.user_id AS postuserid, 
                   o.post_title, o.post_description
            FROM public.user u
            LEFT JOIN public.post o ON u.id = o.user_id;
        `;
    
        const data = await this.postRepository.manager.query(query);
        const usersMap = new Map();
    
        data.forEach(item => {
            const { userid, name, email, postid, postuserid, post_title, post_description } = item;
    
            // If the user is not already in the map, add them with an empty posts array
            if (!usersMap.has(userid)) {
                usersMap.set(userid, {
                    userid,
                    name,
                    email,
                    posts: []
                });
            }
    
            if (userid === postuserid) {
                usersMap.get(userid).posts.push({
                    postid,
                    postuserid,
                    post_title,
                    post_description
                });
            }
        });
    
        // Convert the map values to an array and return the result
        return Array.from(usersMap.values());

       
    }

    async findUserAllPost(userid: number) { 

        const query = 'SELECT * FROM public.post WHERE user_id = $1';
        console.log("userid "+userid);
        return await this.postRepository.query(query, [userid]);
    }
    
    
}
