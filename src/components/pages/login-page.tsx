import {Button, Form, Input, Layout, PageHeader, Space} from 'antd';
import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useRecoilCallback} from 'recoil';
import {LoginMutationVariables} from '../../api/generated';
import {useAuthMutations} from '../../selectors/auth';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [loginApi] = useAuthMutations();
  const location = useLocation();
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const from: string = (location.state as any)?.from?.pathname || '/';

  const login = useRecoilCallback(
    () =>
      async ({email, password}: Required<LoginMutationVariables>) => {
        setLoading(true);
        try {
          const [success] = await loginApi({email, password});
          if (success) {
            navigate(from);
          } else {
            // eslint-disable-next-line no-alert
            alert('login failed.');
          }
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
      },
    [from],
  );

  return (
    <Layout>
      <PageHeader title='ログイン'/>
      <Form onFinish={login}>
        <Form.Item name='email'>
          <Input type='email'/>
        </Form.Item>
        <Form.Item name='password'>
          <Input type='password'/>
        </Form.Item>
        <Form.Item>
          <Space direction='horizontal'>
            <Button htmlType='submit' type='primary' loading={loading}>
              ログイン
            </Button>
            <Link to='/password_reset'>パスワード再設定</Link>
            <Link to='/signup'>会員登録</Link>
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default LoginPage;
