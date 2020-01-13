import { gql } from 'apollo-boost';

export const GetFormFieldInputData = gql`
  query GetFormFieldInputData($gid: Int!, $fid: Int!) {
    getFormFieldInputData(gid: $gid, fid: $fid) {
      name
      displayName
      databaseType
      dataType
      inputType
      options
    }
  }
`;
