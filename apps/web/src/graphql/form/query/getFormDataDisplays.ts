import { gql } from 'apollo-boost';

export const GetFormDataDisplays = gql`
  query GetFormDataDisplays($gid: Int!, $fid: Int!) {
    getFormDataDisplays(gid: $gid, fid: $fid)
  }
`;
