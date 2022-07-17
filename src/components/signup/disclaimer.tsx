import {Alert, List} from 'antd';
import {useRecoilValue} from 'recoil';
import {appSelector} from '../../selectors/app';

export function Disclaimer() {
  const config = useRecoilValue(appSelector);
  return (
    <Alert
      message={
        <List>
          <List.Item>登録されたメール宛てにシステムよりメールが送信されます</List.Item>
          <List.Item>メールにはメールアドレスの確認、運営からのお知らせ、参加したグループの新規投稿の通知などがありますが、これに限りません</List.Item>
          <List.Item>メールアドレスの変更・システムからの退会については運営に直接お問い合わせください</List.Item>
        </List>
      } type='warning'/>
  );
}
