import { Field, Int, ArgsType } from 'type-graphql';

@ArgsType()
export default class PaginationArgs {
  @Field(() => Int, { defaultValue: 0, description: 'Amount of objects to skip' })
  skip: number;

  @Field(() => Int, { defaultValue: 20, description: 'Amount of objects returned' })
  take: number;
}
