import { gql } from 'apollo-boost';

export const GetFormData = gql`
  query GetFormData($groupName: String!, $formName: String!) {
    getFormData(groupName: $groupName, formName: $formName)
  }
`;
