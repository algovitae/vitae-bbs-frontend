import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { selector, snapshot_UNSTABLE, useRecoilState } from "recoil";
import { LoginDocument, LoginMutation, LoginMutationVariables } from "../api/generated";
import { loggedInUserIdSelector, peekBearerToken } from "./auth";

export const apiClientSelector = selector<ApolloClient<NormalizedCacheObject>>({
    key: 'apiClientSelector',
    get: ({ get }) => {
        const user_id = get(loggedInUserIdSelector)
        const token = peekBearerToken(user_id);
        const client = new ApolloClient({
            uri: 'http://localhost:4000',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: new InMemoryCache({}),
        });
        return client;
    }
})

export const apiClientWithoutAuth = () => {
    return new ApolloClient({
        uri: 'http://localhost:4000',
        cache: new InMemoryCache({}),
    });
}
