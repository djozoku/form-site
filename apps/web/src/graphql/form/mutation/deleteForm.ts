import { gql } from 'apollo-boost';

export const DeleteForm = gql`
  mutation DeleteForm($groupName: String!, $formName: String!) {
    deleteForm(groupName: $groupName, formName: $formName)
  }
`;
