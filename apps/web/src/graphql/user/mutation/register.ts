import { gql } from 'apollo-boost';

export const Register = gql`
  mutation Register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $username: String!
    $password: String!
  ) {
    register(
      user: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
      }
    )
  }
`;
