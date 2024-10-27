import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<User> {

  constructor(
    @InjectConnection('nest_learn')
    @Inject(WINSTON_MODULE_PROVIDER)
    private readonly dataSource: DataSource, 
    
  ) {
    super(User, dataSource.createEntityManager());
  }

  async checkDatabaseConnection(): Promise<string> {
    try {
      await this.dataSource.query('SELECT 1'); 
      return 'Database connection is successful';
    } catch {
      return 'Failed to connect to the database';
    }
  }

}
