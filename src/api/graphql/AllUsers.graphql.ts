import { gql } from "@apollo/client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AllUsersQuery = gql`
query AllUsers {
  allUsers {
    user_id
    user_name  
  }
}`