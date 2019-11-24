import { gql } from 'apollo-boost';

export const Group = gql`
  query Group($groupId: Int!) {
    group(groupId: $groupId) {
      id
      name
      owner {
        id
      }
      members {
        id
      }
      forms {
        id
        name
        displayName
      }
    }
  }
`;
