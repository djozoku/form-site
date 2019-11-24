import { gql } from 'apollo-boost';

export const AcceptInvite = gql`
  mutation AcceptInvite($group: String!) {
    acceptInvite(group: $group)
  }
`;
