import {cp} from 'node:fs';
import {group} from 'node:console';
import {Button, Card, Comment, Form, Input, Skeleton} from 'antd';
import React, {useState} from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import TextArea from 'antd/lib/input/TextArea';
import {prop, reverse, sortBy} from 'rambda';
import {CreateThreadCommentDocument, CreateThreadCommentMutation, ThreadComment} from '../../api/generated';
import {threadCommentsSelector, threadSelector} from '../../selectors/thread';
import {apiClientSelector} from '../../selectors/api';

type ThreadFormValues = {
  title: string;
  body: string;
};

function ThreadForm({threadId}: {threadId: string}) {
  const [isLoading, setIsLoading] = useState(false);
  const callback = useRecoilCallback(({snapshot, refresh}) => async ({title, body}: ThreadFormValues) => {
    setIsLoading(true);

    try {
      const client = await snapshot.getPromise(apiClientSelector);
      const parameter = {
        threadId,
        title,
        body,
      };
      console.log(parameter);
      const result = await client.mutate<CreateThreadCommentMutation>({
        mutation: CreateThreadCommentDocument,
        variables: parameter,
      });
      console.log(result);
      refresh(threadCommentsSelector(threadId));
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, [threadId]);

  return (
    <Card title='新規投稿'>
      <Form<ThreadFormValues> onFinish={callback}>
        <Form.Item<ThreadFormValues> required name='title' label='件名'>
          <Input/>
        </Form.Item>
        <Form.Item<ThreadFormValues> required name='body' label='本文'>
          <TextArea/>
        </Form.Item>
        <Form.Item>
          <Button htmlType='submit' type='primary' style={{width: '100%'}} loading={isLoading}>投稿</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

function ThreadCommentCard(comment: {body: string; commentedBy: {userName: string}; commentedAt: string}) {
  return <Comment content={comment.body} author={comment.commentedBy.userName} datetime={comment.commentedAt}/>;
}

function ThreadPageContent() {
  const parameters = useParams<{groupId: string; threadId: string}>();

  const thread = useRecoilValue(threadSelector(parameters.threadId ?? ''));
  const comments = useRecoilValue(threadCommentsSelector(thread?.id ?? ''));
  if (!thread) {
    return null;
  }

  return (
    <Card title={thread?.threadName}>
      <ThreadForm threadId={thread?.id}/>
      {reverse(sortBy(prop('commentedAt'), comments)).map(c => <ThreadCommentCard key={c.id} {...c}/>)}
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

