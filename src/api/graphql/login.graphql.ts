import {gql} from '@apollo/client';

const loginMutation = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user_identity {
        email
        user {
          user_id
          user_name
        }
      }
    }
  }
`;
