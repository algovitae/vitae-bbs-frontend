import {gql} from '@apollo/client';
import {selector, selectorFamily} from 'recoil';
import {Group, GroupDocument, GroupQuery, GroupThreadsDocument, GroupThreadsQuery, Thread, UserIdentityByAuthorizationDocument, UserIdentityByAuthorizationQuery} from '../api/generated';
import {apiClientSelector} from './api';

export const myGroupsSelector = selector<Array<{id: string; groupName: string}>>({
  key: 'myGroupsSelector',
  async get({get}) {
    const api = get(apiClientSelector);
    const result = await api.query<UserIdentityByAuthorizationQuery>({query: UserIdentityByAuthorizationDocument});
    return (result.data.userIdentityByAuthorization?.user?.memberships.map(m => m.group) ?? []) as Array<{id: string; groupName: string}>;
  },
});

export const groupSelector = selectorFamily<Pick<Group, 'id' | 'groupName'> | undefined, string>({
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

export const groupThreadsSelector = selectorFamily<Array<Pick<Thread, 'id' | 'threadName'>>, string>({
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
