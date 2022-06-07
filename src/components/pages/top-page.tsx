import {Button, Card, Skeleton, Table} from 'antd';
import React from 'react';
import {Link} from 'react-router-dom';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {apolloClient} from '../../api';
import {
  AllUsersDocument,
  LoginDocument,
  LoginMutation,
} from '../../api/generated';
import {myGroupsSelector} from '../../selectors/group';
import {allUsersSelector} from '../../selectors/user';
import {LoggedInUserName} from '../auth/logged-in-user-name';

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
    <Card>
      <Card>
        hello! you are <LoggedInUserName/>
      </Card>
      <React.Suspense fallback={<Skeleton/>}>
        <TopPageContent/>
      </React.Suspense>
    </Card>
  );
}

export default TopPage;
