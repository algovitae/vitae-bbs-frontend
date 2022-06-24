import {Button, Form, Input, Layout, PageHeader, Space} from 'antd';
import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useRecoilCallback} from 'recoil';
import {LoginMutationVariables, ResetPasswordMutationVariables} from '../../api/generated';
import {useAuthMutations, usePasswordResetMutation} from '../../selectors/auth';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const resetApi = usePasswordResetMutation();
  const navigate = useNavigate();

  const reset = useRecoilCallback(
    () =>
      async ({email}: Required<ResetPasswordMutationVariables>) => {
        setLoading(true);
        try {
          const [success] = await resetApi({email});
          if (success) {
            // eslint-disable-next-line no-alert
            alert('メールを送信しました');
            navigate('/');
          } else {
            // eslint-disable-next-line no-alert
            alert('メールの送信に失敗しました');
          }
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
      },
    [],
  );

  return (
    <Layout>
      <PageHeader title='パスワード再設定'/>
      <Form onFinish={reset}>
        <Form.Item name='email'>
          <Input type='email'/>
        </Form.Item>
        <Form.Item>
          <Space direction='horizontal'>
            <Button htmlType='submit' type='primary' loading={loading}>
              再設定(メール送信)
            </Button>
            <Link to='/'>ログイン画面へ戻る</Link>
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default LoginPage;
