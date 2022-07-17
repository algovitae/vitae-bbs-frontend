import {useQuery} from '@apollo/client';
import {Button, Form, Input, Layout, notification, PageHeader, Space} from 'antd';
import {useState} from 'react';
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {decode, JwtPayload} from 'jsonwebtoken';
import {InitiateSignupMutationVariables, SignupMutationVariables} from '../../api/generated';
import {appSelector} from '../../selectors/app';
import {Disclaimer} from '../signup/disclaimer';
import {useSignupMutations} from '../../selectors/auth';

function SignupPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const config = useRecoilValue(appSelector);
  const location = useLocation();
  const token = (new URLSearchParams(location.search)).get('token')!;
  const decoded = decode(token, {complete: true});

  const [, signupApi] = useSignupMutations();

  const submit = useRecoilCallback(
    () =>
      async ({token, userName, userTitle, password}: Required<SignupMutationVariables>) => {
        setLoading(true);
        try {
          const [success] = await signupApi({token, userName, userTitle, password});
          if (success) {
            notification.success({message: '会員登録に成功しました。ログインをして利用を開始してください'});
            navigate('/login', {replace: true});
          } else {
            // eslint-disable-next-line no-alert
            alert('signup failed.');
          }
        } catch (error) {
          console.error(error);
        }

        setLoading(false);
      },
    [token, signupApi],
  );

  return (
    <Layout>
      <PageHeader title='会員登録を完了'/>
      <Form labelCol={{span: 24}} initialValues={{email: (decoded?.payload as JwtPayload).email as string, token}} onFinish={submit}>
        <Form.Item name='email' label='メールアドレス'>
          <Input readOnly disabled type='email'/>
        </Form.Item>
        <Form.Item hidden name='token'>
          <Input readOnly disabled type='hidden'/>
        </Form.Item>
        <Form.Item name='userName' label='氏名'>
          <Input type='text' placeholder='山田 太郎'/>
        </Form.Item>
        <Form.Item name='userTitle' label={config.user_title_label}>
          <Input type='text'/>
        </Form.Item>
        <Form.Item name='password' label='パスワード'>
          <Input type='password'/>
        </Form.Item>
        <Form.Item>
          <Disclaimer/>
        </Form.Item>
        <Form.Item>
          <Space direction='horizontal'>
            <Button htmlType='submit' type='primary' loading={loading}>
              ユーザー登録
            </Button>
            <Link to='/login'>ログイン画面へ戻る</Link>
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default SignupPage;
