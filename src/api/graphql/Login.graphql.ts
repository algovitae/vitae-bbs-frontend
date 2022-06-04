import { gql } from "@apollo/client";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginMutation = gql`
mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token,
      user_identity {
        email, 
        user {
          user_id
          user_name
        }
      }
    }
  }`