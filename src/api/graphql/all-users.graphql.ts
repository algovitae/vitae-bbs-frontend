import {gql} from '@apollo/client';

const allUsersQuery = gql`
  query AllUsers {
    allUsers {
      id
      userName
    }
  }
`;
