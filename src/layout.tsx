import {Layout, Typography} from 'antd';
import {Link, Outlet} from 'react-router-dom';
import {LoggedInUserName} from './components/auth/logged-in-user-name';
import {RequireAuth} from './components/auth/require-auth';

export function AppLayout() {
  return (
    <Layout>
      <Layout.Header>
        <Link to='/'>
          <Typography style={{color: 'white'}}>
            Yet Another BBS
          </Typography>
        </Link>
        <Layout style={{position: 'absolute', top: 0, right: 50, background: 'none', color: 'white'}}>
          <RequireAuth>
            <LoggedInUserName/>
          </RequireAuth>
        </Layout>
      </Layout.Header>
      <Layout style={{padding: '0 50px'}}>
        <Layout.Content>
          <Outlet/>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
