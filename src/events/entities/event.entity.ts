import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
} from 'typeorm';

@Entity('event')
export class EventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CategoryEntity, (categoryEntity) => categoryEntity.events)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.events_created)
  @JoinColumn({ name: 'creator_id' })
  creator: UserEntity;

  @ManyToMany(
    () => UserEntity,
    (userEntity) => userEntity.events_participations,
  )
  @JoinTable()
  participants: UserEntity[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image_path: string;

  @Column()
  address: string;

  @Column()
  zip_code: string;

  @Column()
  city: string;

  // @Column()
  // date_time: Date;

  @Column()
  is_free: boolean;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
