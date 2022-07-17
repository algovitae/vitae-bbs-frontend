import {ApolloClient, InMemoryCache} from '@apollo/client';
import {selector} from 'recoil';
import {apiEndpoint} from '../api/endpoint';
import {App, AppDocument, AppQuery} from '../api/generated';

const apiClientWithoutAuth = (() =>
  new ApolloClient({
    uri: apiEndpoint,
    cache: new InMemoryCache({}),
  }))();

export const appSelector = selector<App>({
  key: 'appSelector',
  async get() {
    const result = await apiClientWithoutAuth.query<AppQuery>({
      query: AppDocument,
    });
    return result.data.app ?? {};
  },
});

