import {ApolloClient, InMemoryCache} from '@apollo/client';

const dummyBearerToken = 'eyJ1c2VyX2lkIjoiMjlvbkJmV3F3djkwRHZsYXN6bzBtV1VTSjZ4IiwiZW1haWwiOiJob2dlQGV4YW1wbGUuY29tIn0=';

/**
 * @deprecated
 */
export const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  headers: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Authorization: `Bearer ${dummyBearerToken}`,
  },
  cache: new InMemoryCache({}),
});
