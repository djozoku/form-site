/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { User as IUser } from '@form/interfaces/types/User';

import Group from '@module/group/Group.Entity';

@ObjectType()
@Entity()
export default class User extends BaseEntity implements IUser {
  @Field(() => Int, { description: 'User ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: "User's First Name" })
  @Column()
  firstName: string;

  @Field({ description: "User's Last Name" })
  @Column()
  lastName: string;

  @Field({ description: "User's username" })
  @Column('text', { unique: true })
  username: string;

  @Field({ description: "User's email" })
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  confirmed: boolean;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Field(() => [Group], { nullable: true, description: 'Groups owned by this user' })
  @OneToMany(
    () => Group,
    (group) => group.owner
  )
  ownedGroups?: Group[];

  @Field(() => [Group], { nullable: true, description: 'Groups that this user is a member of' })
  @ManyToMany(
    () => Group,
    (group) => group.members
  )
  groups?: Group[];
}
