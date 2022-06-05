import {Button, Form, Input, Layout, PageHeader} from 'antd';
import {useState} from 'react';
import {useRecoilCallback} from 'recoil';
import {LoginMutationVariables} from '../../api/generated';
import {useAuthMutations} from '../../selectors/auth';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [loginApi] = useAuthMutations();

  const login = useRecoilCallback(
    () =>
      async ({email, password}: Required<LoginMutationVariables>) => {
        setLoading(true);
        try {
          const [success] = await loginApi({email, password});
          if (success) {
            // eslint-disable-next-line no-alert
            alert('login succeeded. todo: navigation');
          } else {
            // eslint-disable-next-line no-alert
            alert('login failed.');
          }
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
      },
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
          <Button htmlType='submit' type='primary' loading={loading}>
            ログイン
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default LoginPage;
