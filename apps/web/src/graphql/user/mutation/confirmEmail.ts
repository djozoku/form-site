import { gql } from 'apollo-boost';

export const ConfirmEmail = gql`
  mutation ConfirmEmail($token: String!) {
    confirmEmail(token: $token)
  }
`;
