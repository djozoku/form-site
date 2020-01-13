import { gql } from 'apollo-boost';

export const Logout = gql`
  mutation Logout {
    logout
  }
`;
