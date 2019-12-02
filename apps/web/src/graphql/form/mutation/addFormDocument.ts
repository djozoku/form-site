import { gql } from 'apollo-boost';

export const AddFormDocument = gql`
  mutation AddFormDocument($gid: Int!, $fid: Int!, $document: String!) {
    addFormDocument(gid: $gid, fid: $fid, document: $document)
  }
`;
