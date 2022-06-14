import {Button, Card, Col, Form, Input, Modal, Row, Skeleton, Table} from 'antd';
import React, {useState} from 'react';
import {Link, Navigate, useOutlet, useParams} from 'react-router-dom';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {CreateThreadDocument, CreateThreadMutation} from '../../api/generated';
import {apiClientSelector} from '../../selectors/api';
import {groupSelector, groupThreadsSelector} from '../../selectors/group';

type CreateThreadValues = {
  thread_name: string;
};

function InitiateCreateThreadButton({groupId}: {groupId: string}) {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const callback = useRecoilCallback(({snapshot, refresh}) => async ({thread_name}: CreateThreadValues) => {
    setIsLoading(true);

    try {
      const client = await snapshot.getPromise(apiClientSelector);
      const parameter = {
        groupId,
        threadName: thread_name,
      };
      console.log(parameter);
      const result = await client.mutate<CreateThreadMutation>({
        mutation: CreateThreadDocument,
        variables: parameter,
      });
      console.log(result);
      setOpen(false);
      refresh(groupThreadsSelector(groupId));
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, [groupId]);
  return (
    <>
      <Button onClick={() => {
        setOpen(true);
      }}
      >スレッド作成
      </Button>
      <Modal
        visible={open} footer={false}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Card title='スレッド作成'>
          <Form<CreateThreadValues> onFinish={callback}>
            <Form.Item<CreateThreadValues> required name='thread_name' label='スレッド名'>
              <Input/>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary' style={{width: '100%'}} loading={isLoading}>作成</Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

function GroupPageContent() {
  const parameters = useParams<{group_id: string}>();
  const group = useRecoilValue(groupSelector(parameters.group_id ?? ''));
  const threads = useRecoilValue(groupThreadsSelector(parameters.group_id ?? ''));
  if (!group) {
    return <Navigate to='/'/>;
  }

  return (
    <Card title={group?.group_name} extra={<InitiateCreateThreadButton groupId={group.group_id}/>}>
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

