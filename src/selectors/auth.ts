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
  InitiateSignupDocument,
  InitiateSignupMutation,
  InitiateSignupMutationVariables,
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
  ResetPasswordDocument,
  ResetPasswordMutation,
  ResetPasswordMutationVariables,
  SignupDocument,
  SignupMutation,
  SignupMutationVariables,
} from '../api/generated';
import {apiEndpoint} from '../api/endpoint';

const apiClientWithoutAuth = () =>
  new ApolloClient({
    uri: apiEndpoint,
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
    return accessToken?.userIdentity?.user?.id;
  },
});

export const loggedInUserNameSelector = selector({
  key: 'loggedInUserNameSelector',
  get({get}) {
    const accessToken = get(rawAccessTokenAtom);
    return accessToken?.userIdentity?.user?.userName;
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
      ).data ?? {login: undefined};
    setRawAccessToken(login ?? undefined);
    return [Boolean(login), ''] as const; // TODO: add reason?
  };

  const logout = async () => {
    setRawAccessToken(undefined);
    return [true, ''] as const;
  };

  return [login, logout] as const;
};

export const usePasswordResetMutation = () => {
  const reset = async ({email}: Required<ResetPasswordMutationVariables>) => {
    const apolloClient = apiClientWithoutAuth();
    const {resetPassword}
      = (
        await apolloClient.mutate<ResetPasswordMutation>({
          mutation: ResetPasswordDocument,
          variables: {email},
        })
      ).data ?? {};
    return [Boolean(resetPassword), ''] as const;
  };

  return reset;
};

export const useSignupMutations = () => {
  const initiateSignup = async ({email, passphrase}: Required<InitiateSignupMutationVariables>) => {
    const apolloClient = apiClientWithoutAuth();
    const {initiateSignup}
      = (
        await apolloClient.mutate<InitiateSignupMutation>({
          mutation: InitiateSignupDocument,
          variables: {email, passphrase},
        })
      ).data ?? {};
    return [Boolean(initiateSignup), ''] as const;
  };

  const signup = async ({token, userName, userTitle, password}: Required<SignupMutationVariables>) => {
    const apolloClient = apiClientWithoutAuth();
    const {signup}
      = (
        await apolloClient.mutate<SignupMutation>({
          mutation: SignupDocument,
          variables: {token, userName, userTitle, password},
        })
      ).data ?? {};
    return [Boolean(signup), ''] as const;
  };

  return [initiateSignup, signup] as const;
};
