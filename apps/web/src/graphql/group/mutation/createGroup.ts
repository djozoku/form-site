import { gql } from 'apollo-boost';

export const CreateGroup = gql`
  mutation CreateGroup($name: String!) {
    createGroup(name: $name)
  }
`;
