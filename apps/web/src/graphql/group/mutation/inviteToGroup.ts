import { gql } from 'apollo-boost';

export const InviteToGroup = gql`
  mutation InviteToGroup($username: String!, $group: String!) {
    inviteToGroup(username: $username, group: $group)
  }
`;
