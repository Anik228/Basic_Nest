import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

}
