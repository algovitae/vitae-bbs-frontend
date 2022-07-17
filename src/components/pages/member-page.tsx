import {Button, Card, Form, Input, Modal, notification, Select, Skeleton, Table} from 'antd';
import {set} from 'rambda';
import {Suspense, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {useRecoilValue, useRecoilCallback} from 'recoil';
import {AddMembershipDocument, AddMembershipMutation, DeleteMembershipDocument, DeleteMembershipMutation, User} from '../../api/generated';
import {apiClientSelector} from '../../selectors/api';
import {appSelector} from '../../selectors/app';
import {groupMembersSelector, groupSelector, usersNotInGroup} from '../../selectors/group';
import {allUsersSelector} from '../../selectors/user';

function RemoveMemberButton({groupId, userId}: {groupId: string; userId: string}) {
  const remove = useRecoilCallback(({refresh, snapshot}) => async () => {
    const release = snapshot.retain();
    try {
      const api = await snapshot.getPromise(apiClientSelector);
      await api.mutate<DeleteMembershipMutation>({
        mutation: DeleteMembershipDocument,
        variables: {
          groupId,
          userId,
        },
      });
      refresh(groupMembersSelector(groupId));
    } catch {
      notification.error({message: 'error'});
    }

    release();
  }, [groupId, userId]);
  return <Button onClick={remove}>グループ脱退</Button>;
}

type AddMemberValues = {
  userId: string;
};

function InitiateAddMemberButton({groupId}: {groupId: string}) {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const callback = useRecoilCallback(({refresh, snapshot}) => async ({userId}: AddMemberValues) => {
    const release = snapshot.retain();
    setIsLoading(true);
    try {
      const api = await snapshot.getPromise(apiClientSelector);
      await api.mutate<AddMembershipMutation>({
        mutation: AddMembershipDocument,
        variables: {
          groupId,
          userId,
        },
      });
      refresh(groupMembersSelector(groupId));
    } catch {
      notification.error({message: 'error'});
    }

    release();
    setIsLoading(false);
    setOpen(false);
  }, [groupId]);

  const users = useRecoilValue(usersNotInGroup(groupId));

  return (
    <>
      <Button onClick={() => {
        setOpen(true);
      }}
      >メンバー追加
      </Button>
      <Modal
        visible={open} footer={false}
        onCancel={() => {
          setOpen(false);
        }}
      >
        <Card title='メンバー追加'>
          <Form<AddMemberValues> onFinish={callback}>
            <Form.Item<AddMemberValues> required name='userId' label='ユーザー選択'>
              <Select
                showSearch
                placeholder='Select a person'
                optionFilterProp='label'
                options={users.map(u => ({value: u.id, label: `${u.userName} [${u.userTitle}]`}))}
                filterOption={(input, option) =>
                  (option!.label as unknown as string).toLowerCase().includes(input.toLowerCase())}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' type='primary' style={{width: '100%'}} loading={isLoading}>追加</Button>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

function MemberPageContent() {
  const parameters = useParams<{groupId: string}>();
  const config = useRecoilValue(appSelector);
  const groupId = parameters.groupId!;
  const group = useRecoilValue(groupSelector(groupId));
  const members = useRecoilValue(groupMembersSelector(groupId));
  if (!group) {
    return <Navigate to='/'/>;
  }

  return (
    <Card title={group?.groupName} extra={<InitiateAddMemberButton groupId={groupId}/>}>
      <Table
        rowKey='id' columns={[{dataIndex: 'userName', title: 'ユーザー名'},
          {dataIndex: 'userTitle', title: config.user_title_label},
          {
            dataIndex: 'id',
            render(value: string, record, index) {
              return <RemoveMemberButton groupId={group.id} userId={value}/>;
            },
          }]} dataSource={members}/>
    </Card>
  );
}

function MemberPage() {
  return (
    <Suspense fallback={<Skeleton/>}>
      <MemberPageContent/>
    </Suspense>
  );
}

export default MemberPage;
