/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToMany, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { User as IUser } from '@form/interfaces/types/User';

import Group from '@module/group/Group.Entity';

@ObjectType()
@Entity()
export default class User extends BaseEntity implements IUser {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column('text', { unique: true })
  username: string;

  @Field()
  @Column('text', { unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  confirmed: boolean;

  @Column('int', { default: 0 })
  tokenVersion: number;

  @Field(() => [Group], { nullable: true })
  @OneToMany(
    () => Group,
    (group) => group.owner
  )
  ownedGroups?: Group[];

  @Field(() => [Group], { nullable: true })
  @ManyToMany(
    () => Group,
    (group) => group.members
  )
  groups?: Group[];
}
