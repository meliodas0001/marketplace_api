import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserEntity } from './user.entity';

@Entity('store')
export class StoreEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  store_name: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  ownerId: string;

  @ManyToMany(() => UserEntity)
  @JoinTable({
    name: 'store_users',
    joinColumn: { name: 'store_id' },
    inverseJoinColumn: { name: 'user_id' },
  })
  users: UserEntity[];

  constructor() {
    this.id = uuid();
  }
}
