import React from 'react';
import './App.less';
import {Button, Card} from 'antd';
import {RecoilRoot} from 'recoil';
import TopPage from './components/pages/top-page';
import LoginPage from './components/pages/login-page';

function App() {
  return (
    <RecoilRoot>
      <TopPage/>
      <LoginPage/>
    </RecoilRoot>
  );
}

export default App;
