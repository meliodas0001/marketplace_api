import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';

@Entity('roles')
export class RolesEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  role: string;

  @Column()
  storeId: string;

  @ManyToOne(() => UserEntity, (user) => user.role)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  constructor() {
    this.id = uuid();
  }
}
