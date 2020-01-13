import { gql } from 'apollo-boost';

export const Forms = gql`
  query Forms($skip: Int, $take: Int) {
    forms(skip: $skip, take: $take) {
      id
      name
      displayName
      owner {
        id
      }
    }
  }
`;
