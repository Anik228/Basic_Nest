import { PostEntity } from 'src/post/entity/create_post.entity';
import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @OneToMany(() => PostEntity, PostEntity => PostEntity.user)
  posts: PostEntity[];
}

//nest g controller controller/controller/controller --flat --no-spec

//nest g service auth/services/auth --flat --no-spec