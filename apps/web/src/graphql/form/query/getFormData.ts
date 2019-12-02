import { gql } from 'apollo-boost';

export const GetFormData = gql`
  query GetFormData($gid: Int!, $fid: Int!) {
    getFormData(gid: $gid, fid: $fid)
  }
`;
