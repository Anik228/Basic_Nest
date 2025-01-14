import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, Param, Patch, Post,UseGuards,Query } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { CreatePostDTO } from '../dto/create_post.dto';
import { PostEntity } from '../entity/create_post.entity';
import { JwtAuthGuard } from '../../../src/auth/jwt-auth.guard';
import { RolesGuard } from '../../../src/auth/role.guard';
import { Roles } from '../../../src/auth/roles.decorator';
import { Role } from '../../../src/auth/roles.enum';
import { console } from 'inspector';
import { RequireLogin } from 'src/auth/require-login.decorator';

@Controller('post')
export class PostController {

  constructor(private readonly postService: PostService) {} 

  @Post('create-post')
  @RequireLogin()
  async createUser(@Body() createPostDto: CreatePostDTO): Promise<PostEntity> {
    if (!createPostDto.post_description) {
      throw new BadRequestException('Post description is required');
    }
    if (!createPostDto.post_title) {
        throw new BadRequestException('Post title is required');
    }
    else{
    try{
    return this.postService.createPost(createPostDto);}
    catch(error){
      console.error('Error creating post:', error); 
      throw new InternalServerErrorException('Failed to create post');
    }

   }
  }
  
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('get-all-post')
  @RequireLogin()
  async getAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @RequireLogin()
  @Get('get-all-post-with-user-details')
  async getUsersWithPosts(): Promise<PostEntity[]> {
    return this.postService.findUsersWithPosts();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @RequireLogin()
  @Get('get-all-post-with-user-without-user-details')
  async getUsersWithPostsWithoutPost(): Promise<PostEntity[]> {
    return this.postService.findUsersWithPostsWithoutPost();
  }
  
  @Get('get-all-user-all-post') 
  @RequireLogin()
  getPost(@Query('user_id') userid: number
  ) {
  
    return this.postService.findUserAllPost(userid);
  }

}
