import {selectorFamily} from 'recoil';
import {Thread, ThreadComment, ThreadCommentsDocument, ThreadCommentsQuery, ThreadDocument, ThreadQuery} from '../api/generated';
import {apiClientSelector} from './api';

export const threadSelector = selectorFamily<Pick<Thread, 'group_id' | 'thread_id' | 'thread_name'> | undefined, Pick<Thread, 'group_id' | 'thread_id'>>({
  key: 'threadSelector',
  get: ({group_id, thread_id}) => async ({get}) => {
    const api = get(apiClientSelector);
    const result = await api.query<ThreadQuery>({
      query: ThreadDocument,
      variables: {groupId: group_id, threadId: thread_id},
    });
    return result.data.thread ?? undefined;
  },
});

export const threadCommentsSelector = selectorFamily({
  key: 'threadCommentsSelector',
  get: ({group_id, thread_id}: Pick<Thread, 'group_id' | 'thread_id'>) => async ({get}) => {
    const api = get(apiClientSelector);
    const result = await api.query<ThreadCommentsQuery>({
      query: ThreadCommentsDocument,
      variables: {groupId: group_id, threadId: thread_id},
    });
    return result.data.thread?.comments ?? [];
  },
});

