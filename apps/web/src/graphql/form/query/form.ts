import { gql } from 'apollo-boost';

export const Form = gql`
  query Form($id: Int!) {
    form(formId: $id) {
      id
      name
      displayName
      owner {
        id
      }
    }
  }
`;
