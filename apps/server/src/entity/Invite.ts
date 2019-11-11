import { Entity, BaseEntity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import Group from './Group';
import User from './User';

@Entity()
export default class Invite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Group)
  group: Group;

  @OneToOne(() => User)
  user: User;
}
