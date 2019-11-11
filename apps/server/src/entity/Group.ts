/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Group as IGroup } from '@form/interfaces/types/Group';

import User from './User';

@ObjectType()
@Entity()
export default class Group extends BaseEntity implements IGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { unique: true })
  name: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ownedGroups)
  owner: User;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  members: User[];
}
