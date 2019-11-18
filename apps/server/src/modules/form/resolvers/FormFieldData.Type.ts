/* eslint-disable react/static-property-placement */
import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class FormFieldData {
  @Field()
  name: string;

  @Field()
  displayName: string;

  @Field()
  databaseType: string;

  @Field()
  inputType: string;

  @Field(() => [String], { nullable: true })
  options?: string[];
}
