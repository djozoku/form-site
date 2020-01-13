/* eslint-disable import/no-cycle */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { Group as IGroup } from '@form/interfaces/types/Group';

import User from '@module/user/User.Entity';
import Form from '@module/form/Form.Entity';

@ObjectType()
@Entity()
export default class Group extends BaseEntity implements IGroup {
  @Field(() => Int, { description: 'Group ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'Group Name' })
  @Column('text', { unique: true })
  name: string;

  @Field(() => User, { nullable: true, description: 'User that owns this group' })
  @ManyToOne(
    () => User,
    (user) => user.ownedGroups
  )
  owner?: User;

  @Field(() => [User], { nullable: true, description: 'Members of this group' })
  @ManyToMany(
    () => User,
    (user) => user.groups
  )
  @JoinTable()
  members?: User[];

  @Field(() => [Form], { nullable: true, description: 'Forms owned by this group' })
  @OneToMany(
    () => Form,
    (form) => form.owner
  )
  forms?: Form[];
}
