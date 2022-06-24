import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {selector, snapshot_UNSTABLE, useRecoilState} from 'recoil';
import {apiEndpoint} from '../api/endpoint';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from '../api/generated';
import {bearerTokenSelector, loggedInUserIdSelector} from './auth';

export const apiClientSelector = selector<ApolloClient<NormalizedCacheObject>>({
  key: 'apiClientSelector',
  async get({get}) {
    const userId = get(loggedInUserIdSelector);
    const token = get(bearerTokenSelector);
    console.log('apiClientSelector userId', userId, token);
    const client = new ApolloClient({
      uri: apiEndpoint,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token ?? ''}`,
      },
      cache: new InMemoryCache({}),
    });
    return client;
  },
  dangerouslyAllowMutability: true,
});
