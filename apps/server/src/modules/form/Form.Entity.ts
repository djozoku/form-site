/* eslint-disable react/static-property-placement */
/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

import { Form as IForm } from '@form/interfaces/types/Form';

import Group from '@module/group/Group.Entity';
import { FormField, FormDataDisplay } from '@form/interfaces/src/FormData';

@ObjectType()
@Entity()
export default class Form extends BaseEntity implements IForm {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('text', { unique: true })
  name: string;

  @Field()
  @Column('text', { unique: true })
  displayName: string;

  @Field(() => Group, { nullable: true })
  @OneToMany(
    () => Group,
    (group) => group.forms
  )
  owner?: Group;

  @Column('json')
  fields: FormField[];

  @Column('json')
  dataDisplay: FormDataDisplay[];
}
