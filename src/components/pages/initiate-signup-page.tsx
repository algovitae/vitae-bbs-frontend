import {Button, Form, Input, Layout, PageHeader, Space} from 'antd';
import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useRecoilCallback, useRecoilValue} from 'recoil';
import {InitiateSignupMutationVariables} from '../../api/generated';
import {appSelector} from '../../selectors/app';
import {useSignupMutations} from '../../selectors/auth';
import {Disclaimer} from '../signup/disclaimer';

function InitiateSignupPage() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const config = useRecoilValue(appSelector);
  const [initiateApi] = useSignupMutations();

  const submit = useRecoilCallback(
    () =>
      async ({email, passphrase}: Required<InitiateSignupMutationVariables>) => {
        setLoading(true);
        try {
          const [success] = await initiateApi({email, passphrase});
          if (success) {
            navigate('/signup2');
          } else {
            // eslint-disable-next-line no-alert
            alert('signup failed.');
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
      <PageHeader title='会員登録を開始'/>
      <Form labelCol={{span: 24}} onFinish={submit}>
        <Form.Item name='email' label='メールアドレス'>
          <Input type='email' placeholder='hoge@example.com'/>
        </Form.Item>
        <Form.Item name='passphrase' label='合い言葉'>
          <Input type='text' placeholder='？？'/>
        </Form.Item>
        <Form.Item>
          <Disclaimer/>
        </Form.Item>
        <Form.Item>
          <Space direction='horizontal'>
            <Button htmlType='submit' type='primary' loading={loading}>
              メールアドレスを確認
            </Button>
            <Link to='/login'>ログイン画面へ戻る</Link>
          </Space>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default InitiateSignupPage;
