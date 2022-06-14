import {Button, Card, Form, Input, Modal, Skeleton, Table} from 'antd';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {CreateGroupDocument, CreateGroupMutation} from '../../api/generated';
import {apiClientSelector} from '../../selectors/api';
import {loggedInUserIdSelector} from '../../selectors/auth';
import {groupSelector, myGroupsSelector} from '../../selectors/group';
import {LoggedInUserName} from '../auth/logged-in-user-name';

type CreateGroupValues = {
  group_name: string;
};

function InitiateCreateGroupButton() {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const callback = useRecoilCallback(({snapshot, refresh}) => async ({group_name}: CreateGroupValues) => {
    setIsLoading(true);

    try {
      const client = await snapshot.getPromise(apiClientSelector);
      const me = await snapshot.getPromise(loggedInUserIdSelector);
      const parameter = {
        groupName: group_name,
        memberships: [me!],
      };
      console.log(parameter);
      const result = await client.mutate<CreateGroupMutation>({
        mutation: CreateGroupDocument,
        variables: parameter,
      });
      console.log(result);
      setOpen(false);
      refresh(myGroupsSelector);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }, []);
  return (
    <>
      <Button onClick={() => {
        setOpen(true);
      }}
      >グループ作成
      </Button>
      <Modal
        visible={open} footer={false}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Card title='グループ作成'>
          <Form<CreateGroupValues> onFinish={callback}>
            <Form.Item<CreateGroupValues> required name='group_name' label='グループ名'>
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

function TopPageContent() {
  const data = useRecoilValue(myGroupsSelector);
  return (
    <Table
      dataSource={data}
      columns={[{dataIndex: 'group_name', render(name, {group_id}) {
        return (<Link to={`/groups/${group_id}`}>{name}</Link>);
      }}]}
      rowKey='group_id'
    />
  );
}

function TopPage() {
  return (
    <React.Suspense fallback={<Skeleton/>}>
      <Card extra={<InitiateCreateGroupButton/>}>
        <TopPageContent/>
      </Card>
    </React.Suspense>
  );
}

export default TopPage;
