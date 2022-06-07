import {Card, Skeleton, Table} from 'antd';
import React from 'react';
import {Link, Navigate, useParams} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {groupSelector, groupThreadsSelector} from '../../selectors/group';

function GroupPageContent() {
  const parameters = useParams<{group_id: string}>();
  const group = useRecoilValue(groupSelector(parameters.group_id ?? ''));
  const threads = useRecoilValue(groupThreadsSelector(parameters.group_id ?? ''));
  if (!group) {
    return <Navigate to='/'/>;
  }

  return (
    <Card title={group?.group_name}>
      <Table
        dataSource={threads} rowKey='thread_id' columns={[{
          dataIndex: 'thread_name',
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          render: (name, {thread_id}) => (<Link to={`/group/${group?.group_id}/thread/${thread_id}`}>{name}</Link>),
        }]}/>
    </Card>
  );
}

function GroupPage() {
  return (
    <Card>
      <React.Suspense fallback={<Skeleton/>}>
        <GroupPageContent/>
      </React.Suspense>
    </Card>
  );
}

export default GroupPage;

