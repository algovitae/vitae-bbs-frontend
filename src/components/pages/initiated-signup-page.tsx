import {Alert, Button, Form, Input, Layout, PageHeader, Space} from 'antd';
import {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {appSelector} from '../../selectors/app';
import {Disclaimer} from '../signup/disclaimer';

function InitiatedSignupPage() {
  const [loading, setLoading] = useState(false);
  const config = useRecoilValue(appSelector);

  return (
    <Layout>
      <PageHeader title='メールを送信しました'/>
      <Alert message='メールに記載のリンクを開き、会員登録を完了してください' type='info'/>
    </Layout>
  );
}

export default InitiatedSignupPage;
