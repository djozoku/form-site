import { gql } from 'apollo-boost';

export const UserExists = gql`
  query UserExists {
    userExists(type: "username", value: "ozoku")
  }
`;
