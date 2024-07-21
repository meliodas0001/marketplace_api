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
  address: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];

  constructor() {
    this.id = uuid();
  }
}
