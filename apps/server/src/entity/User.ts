import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity()
export default class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id?: number = undefined;

  @Field()
  @Column()
  firstName?: string = undefined;

  @Field()
  @Column()
  lastName?: string = undefined;

  @Field()
  @Column('text', { unique: true })
  username?: string = undefined;

  @Field()
  @Column('text', { unique: true })
  email?: string = undefined;

  @Column()
  password?: string = undefined;

  @Column()
  confirmation: boolean = false;
}
