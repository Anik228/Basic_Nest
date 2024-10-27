import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDTO {
  @IsNotEmpty()
  @ApiProperty({ example: 'post title' })
  post_title: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'post description' })
  post_description: string;
}
