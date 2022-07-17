import {Layout, Typography} from 'antd';
import {Link, Outlet} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {Helmet} from 'react-helmet';
import {LoggedInUserName} from './components/auth/logged-in-user-name';
import {RequireAuth} from './components/auth/require-auth';
import {appSelector} from './selectors/app';

export function AppLayout() {
  const config = useRecoilValue(appSelector);
  return (
    <Layout>
      <Helmet>
        <title>{config.title}</title>
      </Helmet>
      <Layout.Header>
        <Link to='/'>
          <Typography style={{color: 'white'}}>
            {config.title}
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
      <Layout.Footer>
        <Typography>
          maintained by {config.maintainer}
        </Typography>
      </Layout.Footer>
    </Layout>
  );
}
