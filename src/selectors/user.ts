import { gql } from "@apollo/client";
import { selector } from "recoil";
import { apolloClient } from "../api";
import { Query, User } from "../api/generated";

export const allUsersSelector = selector({
  key: "allUsersSelector",
  get: async () => {
    return (await apolloClient
      .query<Query>({
        query: gql`
                query AllUsers {
                  allUsers {
                    user_id
                    user_name  
                  }
                }`
      })).data.allUsers
  }
})