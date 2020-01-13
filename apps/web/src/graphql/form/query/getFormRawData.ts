import { gql } from 'apollo-boost';

export const GetFormRawData = gql`
  query GetFormRawData($gid: Int!, $fid: Int!) {
    getFormRawData(gid: $gid, fid: $fid)
  }
`;
