import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PostEntity } from '../entity/create_post.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class PostRepository extends Repository<PostEntity> {
  constructor(
    @InjectConnection('nest_learn')
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly dataSource: DataSource, 
    
  ) {
    super(PostEntity, dataSource.createEntityManager());
  }
  
}
