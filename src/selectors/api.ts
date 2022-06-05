import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import {selector, snapshot_UNSTABLE, useRecoilState} from 'recoil';
import {
  LoginDocument,
  LoginMutation,
  LoginMutationVariables,
} from '../api/generated';
import {loggedInUserIdSelector, peekBearerToken} from './auth';

export const apiClientSelector = selector<ApolloClient<NormalizedCacheObject>>({
  key: 'apiClientSelector',
  async get({get}) {
    const userId = get(loggedInUserIdSelector);
    const token = await peekBearerToken(userId);
    const client = new ApolloClient({
      uri: 'http://localhost:4000',
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        Authorization: `Bearer ${token ?? ''}`,
      },
      cache: new InMemoryCache({}),
    });
    return client;
  },
});
