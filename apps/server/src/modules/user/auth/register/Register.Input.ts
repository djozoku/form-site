import { InputType, Field } from 'type-graphql';

@InputType()
export default class RegisterInput {
  @Field({ description: 'First Name' })
  firstName: string;

  @Field({ description: 'Last Name' })
  lastName: string;

  @Field({ description: 'Email' })
  email: string;

  @Field({ description: 'Username' })
  username: string;

  @Field({
    description:
      'Password requires atleast 8 characters, 1 lowercase, 1 uppercase and 1 number or a special character'
  })
  password: string;
}
