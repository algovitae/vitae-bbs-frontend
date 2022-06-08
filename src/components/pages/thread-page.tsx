import {cp} from 'node:fs';
import {Card, Comment, Skeleton} from 'antd';
import React from 'react';
import {useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {ThreadComment} from '../../api/generated';
import {threadCommentsSelector, threadSelector} from '../../selectors/thread';

function ThreadCommentCard(comment: {body: string; commented_by: {user_name: string}; commented_at: string}) {
  return <Comment content={comment.body} author={comment.commented_by.user_name} datetime={comment.commented_at}/>;
}

function ThreadPageContent() {
  const parameters = useParams<{group_id: string; thread_id: string}>();
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const thread = useRecoilValue(threadSelector({group_id: parameters.group_id ?? '', thread_id: parameters.thread_id ?? ''}));
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const comments = useRecoilValue(threadCommentsSelector({group_id: parameters.group_id ?? '', thread_id: parameters.thread_id ?? ''}));

  return (
    <Card title={thread?.thread_name}>
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

