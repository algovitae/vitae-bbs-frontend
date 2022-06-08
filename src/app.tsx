import React from 'react';
import './App.less';
import {Button, Card, Skeleton} from 'antd';
import {RecoilRoot, useRecoilValue} from 'recoil';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import TopPage from './components/pages/top-page';
import LoginPage from './components/pages/login-page';
import GroupPage from './components/pages/group-page';
import {loggedInUserIdSelector} from './selectors/auth';
import {AppLayout} from './layout';
import {RequireAuth} from './components/auth/require-auth';
import ThreadPage from './components/pages/thread-page';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout/>}>
        <Route path='/login' element={<LoginPage/>}/>
        <Route
          path='*' element={
            (
              <RequireAuth redirect>
                <Routes>
                  <Route path='/' element={<TopPage/>}/>
                  <Route path='groups/:group_id' element={<GroupPage/>}>
                    <Route path='threads/:thread_id' element={<ThreadPage/>}/>
                  </Route>
                </Routes>
              </RequireAuth>
            )
          }/>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<Skeleton/>}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </React.Suspense>
    </RecoilRoot>
  );
}

export default App;
