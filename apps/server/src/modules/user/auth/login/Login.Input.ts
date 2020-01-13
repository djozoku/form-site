import { InputType, Field } from 'type-graphql';

@InputType()
export default class LoginInput {
  @Field({ description: 'Username' })
  username: string;

  @Field({ description: 'Password' })
  password: string;
}
