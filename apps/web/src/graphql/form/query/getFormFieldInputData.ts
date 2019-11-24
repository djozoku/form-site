import { gql } from 'apollo-boost';

export const GetFormFieldInputData = gql`
  query GetFormFieldInputData($groupName: String!, $formName: String!) {
    getFormFieldInputData(groupName: $groupName, formName: $formName) {
      name
      displayName
      databaseType
      dataType
      inputType
      options
    }
  }
`;
