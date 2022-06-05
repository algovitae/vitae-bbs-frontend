import {gql} from '@apollo/client';

const allUsersQuery = gql`
  query AllUsers {
    allUsers {
      user_id
      user_name
    }
  }
`;
