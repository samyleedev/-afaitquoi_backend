import { EventEntity } from 'src/events/entities/event.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('category')
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => EventEntity, (eventEntity) => eventEntity.category)
  events: EventEntity[];

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  image_path: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
