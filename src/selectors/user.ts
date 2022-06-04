import { gql } from "@apollo/client";
import { selector } from "recoil";
import { apolloClient } from "../api";
import { AllUsersQuery } from "../api/generated";
import { AllUsersQueryDucumentNode } from "../api/graphql/AllUsers.graphql";

export const allUsersSelector = selector({
  key: "allUsersSelector",
  get: async () => {
    return (await apolloClient
      .query<AllUsersQuery>({query: AllUsersQueryDucumentNode})).data.allUsers
    }
})