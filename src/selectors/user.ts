import { gql } from "@apollo/client";
import { selector } from "recoil";
import { apolloClient } from "../api";
import { AllUsersDocument, AllUsersQuery } from "../api/generated";

export const allUsersSelector = selector({
  key: "allUsersSelector",
  get: async () => {
    return (await apolloClient
      .query<AllUsersQuery>({query: AllUsersDocument})).data.allUsers
    }
})