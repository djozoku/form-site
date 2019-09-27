import { InputType, Field } from 'type-graphql';

@InputType()
export default class LoginInput {
  @Field()
  username: string;

  @Field()
  password: string;
}
