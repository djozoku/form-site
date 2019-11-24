import { Field, Int, ArgsType } from 'type-graphql';

@ArgsType()
export default class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  skip: number;

  @Field(() => Int, { defaultValue: 20 })
  take: number;
}
