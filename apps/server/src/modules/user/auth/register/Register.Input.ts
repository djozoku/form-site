import { InputType, Field } from 'type-graphql';

@InputType()
export default class RegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
