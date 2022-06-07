import {gql} from '@apollo/client';
import {selector, selectorFamily} from 'recoil';
import {Group, GroupDocument, GroupQuery, GroupThreadsDocument, GroupThreadsQuery, Thread, UserIdentityByAuthorizationDocument, UserIdentityByAuthorizationQuery} from '../api/generated';
import {apiClientSelector} from './api';

export const myGroupsSelector = selector<Array<{group_id: string; group_name: string}>>({
  key: 'myGroupsSelector',
  async get({get}) {
    const api = get(apiClientSelector);
    const result = await api.query<UserIdentityByAuthorizationQuery>({query: UserIdentityByAuthorizationDocument});
    return (result.data.userIdentityByAuthorization?.user?.memberships.map(m => m.group) ?? []) as Array<{group_id: string; group_name: string}>;
  },
});

export const groupSelector = selectorFamily<Pick<Group, 'group_id' | 'group_name'> | undefined, string>({
  key: 'groupSelector',
  get: groupId => async ({get}) => {
    const api = get(apiClientSelector);
    const result = await api.query<GroupQuery>({
      query: GroupDocument,
      variables: {groupId},
    });
    return result.data.group ?? undefined;
  },
});

export const groupThreadsSelector = selectorFamily<Array<Pick<Thread, 'thread_id' | 'thread_name'>>, string>({
  key: 'groupThreadsSelector',
  get: groupId => async ({get}) => {
    const api = get(apiClientSelector);
    const result = await api.query<GroupThreadsQuery>({
      query: GroupThreadsDocument,
      variables: {groupId},
    });
    return result.data.group?.threads ?? [];
  },
});
