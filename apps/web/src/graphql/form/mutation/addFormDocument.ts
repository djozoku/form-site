import { gql } from 'apollo-boost';

export const AddFormDocument = gql`
  mutation AddFormDocument($groupName: String!, $formName: String!, $document: String!) {
    addFormDocument(groupName: $groupName, formName: $formName, document: $document)
  }
`;
