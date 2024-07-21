import { v4 as uuid } from 'uuid';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryColumn,
  Unique,
  JoinTable,
  OneToMany,
} from 'typeorm';

import { StoreEntity } from './store.entity';
import { RolesEntity } from './roles.entity';

@Entity('user')
@Unique(['email', 'id'])
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @ManyToMany(() => StoreEntity)
  @JoinTable({
    name: 'store_users',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'store_id' },
  })
  stores: StoreEntity[];

  @OneToMany(() => RolesEntity, (roles) => roles.role)
  role: RolesEntity[];

  constructor() {
    this.id = uuid();
  }
}
