/* eslint-disable react/static-property-placement */
/* eslint-disable import/no-cycle */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { ObjectType, Field, Int } from 'type-graphql';

import { Form as IForm } from '@form/interfaces/types/Form';

import Group from '@module/group/Group.Entity';
import { FormField, FormDataDisplay } from '@form/interfaces/src/FormData';

@ObjectType()
@Entity()
export default class Form extends BaseEntity implements IForm {
  @Field(() => Int, { description: 'Form ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ description: 'Database name' })
  @Column('text', { unique: true })
  name: string;

  @Field({ description: 'Display Name' })
  @Column('text', { unique: true })
  displayName: string;

  @Field(() => Group, { nullable: true, description: 'Group that owns this form' })
  @ManyToOne(
    () => Group,
    (group) => group.forms
  )
  owner?: Group;

  @Column('json')
  fields: FormField[];

  @Column('json')
  dataDisplay: FormDataDisplay[];
}
