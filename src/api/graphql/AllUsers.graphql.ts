import { gql } from "@apollo/client";

export const AllUsersQueryDucumentNode = gql`
query AllUsers {
  allUsers {
    user_id
    user_name  
  }
}`