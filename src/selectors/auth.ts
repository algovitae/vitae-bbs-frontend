import {rawListeners} from 'node:process';
import {ApolloClient, InMemoryCache} from '@apollo/client';
import {
  atom,
  atomFamily,
  selector,
  snapshot_UNSTABLE,
  useRecoilCallback,
  useRecoilState,
  useSetRecoilState,
} from 'recoil';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from '../api/generated';

const apiClientWithoutAuth = () =>
  new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache({}),
  });

// TODO: refresh tokenの実装
// MEMO: access tokenではなくrefresh token（= user_id)を契機としていろいろ更新をかけたい。access tokenが変わること自体は更新をかけないでほしい。
const rawAccessTokenAtom = atom<LoginMutation['login'] | undefined>({
  key: 'rawAccessTokenAtom',
  default: undefined,
});

export const loggedInUserIdSelector = selector({
  key: 'loggedInUserIdSelector',
  get({get}) {
    const accessToken = get(rawAccessTokenAtom);
    return accessToken?.user_identity?.user?.user_id;
  },
});

export const loggedInUserNameSelector = selector({
  key: 'loggedInUserNameSelector',
  get({get}) {
    const accessToken = get(rawAccessTokenAtom);
    return accessToken?.user_identity?.user?.user_name;
  },
});

export const bearerTokenSelector = selector({
  key: 'bearerTokenSelector',
  get({get}) {
    const accessToken = get(rawAccessTokenAtom);
    return accessToken?.token;
  },
});

export const useAuthMutations = () => {
  const setRawAccessToken = useSetRecoilState(rawAccessTokenAtom);
  const login = async ({email, password}: Required<LoginMutationVariables>) => {
    const apolloClient = apiClientWithoutAuth();
    const {login}
      = (
        await apolloClient.mutate<LoginMutation>({
          mutation: LoginDocument,
          variables: {email, password},
        })
      ).data ?? {};
    setRawAccessToken(login ?? undefined);
    return [Boolean(login), ''] as const; // TODO: add reason?
  };

  const logout = async () => {
    setRawAccessToken(undefined);
    return [true, ''] as const;
  };

  return [login, logout] as const;
};
