import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
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

  @ManyToMany(() => UserEntity)
  users: UserEntity[];

  constructor() {
    this.id = uuid();
  }
}
