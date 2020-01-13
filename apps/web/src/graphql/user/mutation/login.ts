import { gql } from 'apollo-boost';

export const Login = gql`
  mutation Login($username: String!, $password: String!) {
    login(user: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
