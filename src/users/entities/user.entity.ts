import { UserRoleEnum } from 'src/enums/user-role.enum';
import { EventEntity } from 'src/events/entities/event.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

@Entity('user')
export class UserEntity {
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(
      this.password,
      Number(process.env.HASH_SALT),
    );
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => EventEntity, (eventEntity) => eventEntity.participants)
  events_participations: EventEntity[];

  @OneToMany(() => EventEntity, (eventEntity) => eventEntity.creator)
  events_created: EventEntity[];

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
