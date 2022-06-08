import {Card, Col, Row, Skeleton, Table} from 'antd';
import React from 'react';
import {Link, Navigate, useOutlet, useParams} from 'react-router-dom';
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
          render: (name, {thread_id}) => (<Link to={`/groups/${group?.group_id}/threads/${thread_id}`}>{name}</Link>),
        }]}/>
    </Card>
  );
}

function GroupPage() {
  const outlet = useOutlet();
  return (
    <Card>
      <React.Suspense fallback={<Skeleton/>}>
        <Row>
          <Col md={outlet ? 6 : 24} xs={24}>
            <GroupPageContent/>
          </Col>
          <Col md={outlet ? 18 : 0} xs={24}>
            {outlet}
          </Col>
        </Row>
      </React.Suspense>
    </Card>
  );
}

export default GroupPage;

