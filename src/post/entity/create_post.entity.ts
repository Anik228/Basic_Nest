import { User } from 'src/user/entity/user.entity';
import { Column, Entity, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from 'typeorm';

@Entity({ name: 'post', synchronize: true })
export class PostEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  post_title: string;

  @Column()
  post_description: string;

  @ManyToOne(() => User, user => user.posts)
  @JoinColumn({ name: 'country_Id' })
  user: User;

}
