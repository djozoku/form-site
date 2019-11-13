/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Form as IForm } from '@form/interfaces/types/Form';

import Group from './Group';

@ObjectType()
@Entity()
export default class Form extends BaseEntity implements IForm {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { unique: true })
  name: string;

  @Field(() => Group, { nullable: true })
  @OneToMany(
    () => Group,
    (group) => group.forms
  )
  owner?: Group;
}
