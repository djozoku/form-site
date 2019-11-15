import { Entity, BaseEntity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import Group from '@module/group/Group.Entity';
import User from '@module/user/User.Entity';

@Entity()
export default class Invite extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Group)
  group: Group;

  @OneToOne(() => User)
  user: User;
}
