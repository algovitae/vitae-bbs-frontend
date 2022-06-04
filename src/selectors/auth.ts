import { ApolloClient, InMemoryCache } from "@apollo/client";
import { rawListeners } from "process";
import { atom, atomFamily, selector, snapshot_UNSTABLE, useRecoilCallback, useRecoilState } from "recoil";
import { LoginDocument, LoginMutation, LoginMutationVariables } from "../api/generated";
import { apiClientWithoutAuth } from "./api";

// TODO: refresh tokenの実装
// MEMO: access tokenではなくrefresh token（= user_id)を契機としていろいろ更新をかけたい。access tokenが変わること自体は更新をかけないでほしい。
const rawAccessTokenAtom = atom<LoginMutation['login'] | undefined>({
    key: 'rawAccessTokenAtom',
    default: undefined,
})

export const loggedInUserIdSelector = selector({
    key: 'loggedInUserIdSelector',
    get: ({ get }) => {
        const accessToken = get(rawAccessTokenAtom)
        return accessToken?.user_identity?.user?.user_id
    }
})

export const loggedInUserNameSelector = selector({
    key: 'loggedInUserIdSelector',
    get: ({ get }) => {
        const accessToken = get(rawAccessTokenAtom)
        return accessToken?.user_identity?.user?.user_name
    }
})

// MEMO: 引数のuser_idはloggedInUserIdSelectorをgetする想定。そのような操作を強制することでuser_idが変わったときに自然と更新がかかるようになる。
export const peekBearerToken = async (user_id: string | undefined) => {
    const snapshot = snapshot_UNSTABLE()
    const access_token = await snapshot.getPromise(rawAccessTokenAtom)
    if (access_token?.user_identity?.user?.user_id === user_id) {
        return access_token?.token ?? undefined
    } else {
        return undefined;
    }
}



export const useAuthMutations = () => {
    const updateRawAccessToken = useRecoilCallback(({set})=> (access_token: LoginMutation['login']|undefined)=> {
        set(rawAccessTokenAtom, access_token)
    })
    const login = async ({ email, password }: Required<LoginMutationVariables> ) => {
        const apolloClient = apiClientWithoutAuth();
        const {login} = (await apolloClient.mutate<LoginMutation>({mutation: LoginDocument, variables: {email, password}})).data ?? {}
        
        updateRawAccessToken(login ?? undefined)
        return [!!login, ''] as const // TODO: add reason?
    }

    const logout = async () => {
        updateRawAccessToken(undefined)
        return [true, ''] as const
    }

    return [login, logout] as const;
}
