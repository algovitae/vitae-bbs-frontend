import { gql } from "@apollo/client";

export const AllUsersQuery = gql`
query AllUsers {
  allUsers {
    user_id
    user_name  
  }
}`