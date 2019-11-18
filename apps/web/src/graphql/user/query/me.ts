import { gql } from 'apollo-boost';

export const Me = gql`
  query Me {
    me {
      id
      firstName
      lastName
      email
      username
      ownedGroups {
        id
        name
        forms {
          id
          name
          displayName
        }
      }
      groups {
        id
        name
        forms {
          id
          name
          displayName
        }
      }
    }
  }
`;
