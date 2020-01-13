import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export default class LoginResponse {
  @Field({ description: 'Access Token' })
  accessToken: string;
}
