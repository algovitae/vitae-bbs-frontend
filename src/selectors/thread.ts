import {selectorFamily} from 'recoil';
import {Thread, ThreadComment, ThreadCommentsDocument, ThreadCommentsQuery, ThreadDocument, ThreadQuery} from '../api/generated';
import {apiClientSelector} from './api';

export const threadSelector = selectorFamily<Pick<Thread, 'id' | 'groupId' | 'threadName'> | undefined, string>({
  key: 'threadSelector',
  get: threadId => async ({get}) => {
    const api = get(apiClientSelector);
    const result = await api.query<ThreadQuery>({
      query: ThreadDocument,
      variables: {threadId},
    });
    return result.data.thread ?? undefined;
  },
});

export const threadCommentsSelector = selectorFamily({
  key: 'threadCommentsSelector',
  get: (threadId: string) => async ({get}) => {
    const api = get(apiClientSelector);
    const result = await api.query<ThreadCommentsQuery>({
      query: ThreadCommentsDocument,
      variables: {threadId},
    });
    return result.data.thread?.comments ?? [];
  },
});

