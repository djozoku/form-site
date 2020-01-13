import { gql } from 'apollo-boost';

export const DeleteForm = gql`
  mutation DeleteForm($gid: Int!, $fid: Int!) {
    deleteForm(gid: $gid, fid: $fid)
  }
`;
