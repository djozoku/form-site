import { gql } from 'apollo-boost';

export const CreateForm = gql`
  mutation CreateForm($groupName: String!, $formName: String!, $formData: String!) {
    createForm(groupName: $groupName, formName: $formName, formData: $formData)
  }
`;
