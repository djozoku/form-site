import { InputType, Field } from 'type-graphql';

import { IsValidEmail, IsValidUsername, IsValidPassword } from '~/validation/ValidateUser';

@InputType()
export default class RegisterInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  @IsValidEmail()
  email: string;

  @Field()
  @IsValidUsername()
  username: string;

  @Field()
  @IsValidPassword()
  password: string;
}
