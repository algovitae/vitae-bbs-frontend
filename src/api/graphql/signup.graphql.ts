import {gql} from '@apollo/client';

const initiateSignupMutation = gql`
  mutation InitiateSignup($email: String!, $passphrase: String!) {
      initiateSignup(email: $email, passphrase: $passphrase)
    }
`;

const signupMutation = gql`
  mutation Signup($token: String!, $userName: String!, $userTitle: String!, $password: String!) {
    signup(token: $token, userName: $userName, userTitle: $userTitle, password: $password)
  }
`;
