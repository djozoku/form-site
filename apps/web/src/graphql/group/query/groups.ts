import { gql } from 'apollo-boost';

export const Groups = gql`
  query Groups($skip: Int, $take: Int) {
    groups(skip: $skip, take: $take) {
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
      }
    }
  }
`;
