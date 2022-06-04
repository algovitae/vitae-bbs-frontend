import React from 'react';
import './App.less';
import { Button, Card } from 'antd';
import { RecoilRoot } from 'recoil';
import TopPage from './components/pages/TopPage';

function App() {
  return (
    <RecoilRoot>
      <TopPage/>
    </RecoilRoot>
  );
}

export default App;
