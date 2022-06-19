import {gql} from '@apollo/client';
import {selector} from 'recoil';
import {apolloClient} from '../api';
import {AllUsersDocument, AllUsersQuery} from '../api/generated';
import {apiClientSelector} from './api';

export const allUsersSelector = selector({
  key: 'allUsersSelector',
  async get({get}) {
    const api = get(apiClientSelector);
    const result = await api.query<AllUsersQuery>({query: AllUsersDocument});
    return result.data.allUsers;
  },
});
