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
import { ObjectType, Field, ID } from 'type-graphql';

import { Group as IGroup } from '@form/interfaces/types/Group';

import User from '@module/user/User.Entity';
import Form from '@module/form/Form.Entity';

@ObjectType()
@Entity()
export default class Group extends BaseEntity implements IGroup {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { unique: true })
  name: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(
    () => User,
    (user) => user.ownedGroups
  )
  owner?: User;

  @Field(() => [User], { nullable: true })
  @ManyToMany(
    () => User,
    (user) => user.groups
  )
  @JoinTable()
  members?: User[];

  @Field(() => [Form], { nullable: true })
  @OneToMany(
    () => Form,
    (form) => form.owner
  )
  forms?: Form[];
}
