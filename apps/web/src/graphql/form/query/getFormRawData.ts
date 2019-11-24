import { gql } from 'apollo-boost';

export const GetFormRawData = gql`
  query GetFormRawData($groupName: String!, $formName: String!) {
    getFormRawData(groupName: $groupName, formName: $formName)
  }
`;
