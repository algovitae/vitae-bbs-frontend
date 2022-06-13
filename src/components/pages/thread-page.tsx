import {cp} from 'node:fs';
import {group} from 'node:console';
import {Button, Card, Comment, Form, Input, Skeleton} from 'antd';
import React, { useState } from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import TextArea from 'antd/lib/input/TextArea';
import {CreateThreadCommentDocument, CreateThreadCommentMutation, ThreadComment} from '../../api/generated';
import {threadCommentsSelector, threadSelector} from '../../selectors/thread';
import { apiClientSelector } from '../../selectors/api';

function ThreadForm({groupId, threadId}: {groupId: string; threadId: string}) {
  const [isLoading, setIsLoading] = useState(false);
  const callback = useRecoilCallback(({snapshot, refresh})=> async({title, body})=> {
    setIsLoading(true);

    try {
      const client = await snapshot.getPromise(apiClientSelector);
      const param = {
        groupId,
        threadId,
        title,
        body
      };
      console.log(param);
      const result = await client.mutate<CreateThreadCommentMutation>({
        mutation: CreateThreadCommentDocument,
        variables: param,
      });
      console.log(result);
      refresh(threadCommentsSelector({group_id: groupId, thread_id:threadId}));
    } catch(e) {
      console.error(e);
    }
    setIsLoading(false);
  }, [groupId, threadId]);

  return (
    <Card title='新規投稿'>
      <Form onFinish={callback}>
        <Form.Item required name='title' label='件名'>
          <Input/>
        </Form.Item>
        <Form.Item required name='body' label='本文'>
          <TextArea/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary' style={{width: '100%'}} loading={isLoading}>投稿</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

function ThreadCommentCard(comment: {body: string; commented_by: {user_name: string}; commented_at: string}) {
  return <Comment content={comment.body} author={comment.commented_by.user_name} datetime={comment.commented_at}/>;
}

function ThreadPageContent() {
  const parameters = useParams<{group_id: string; thread_id: string}>();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const thread = useRecoilValue(threadSelector({group_id: parameters.group_id ?? '', thread_id: parameters.thread_id ?? ''}));
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const comments = useRecoilValue(threadCommentsSelector({group_id: parameters.group_id ?? '', thread_id: parameters.thread_id ?? ''}));
  if (!thread) {
    return null;
  }

  return (
    <Card title={thread?.thread_name}>
      <ThreadForm groupId={thread?.group_id} threadId={thread?.thread_id}/>
      {comments.map(c => <ThreadCommentCard key={c.comment_id} {...c}/>)}
    </Card>
  );
}

function ThreadPage() {
  return (
    <React.Suspense fallback={<Skeleton/>}>
      <ThreadPageContent/>
    </React.Suspense>
  );
}

export default ThreadPage;

