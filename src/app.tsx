import React from 'react';
import './App.less';
import {Button, Card, Skeleton} from 'antd';
import {RecoilRoot, useRecoilValue} from 'recoil';
import {BrowserRouter, Navigate, Route, Routes, useLocation} from 'react-router-dom';
import TopPage from './components/pages/top-page';
import LoginPage from './components/pages/login-page';
import {loggedInUserIdSelector} from './selectors/auth';
import {AppLayout} from './layout';

function RequireAuth({children}: {children: JSX.Element}) {
  const userId = useRecoilValue(loggedInUserIdSelector);
  const location = useLocation();

  if (!userId) {
    return <Navigate replace to='/login' state={{from: location}}/>;
  }

  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout/>}>
        <Route path='/login' element={<LoginPage/>}/>
        <Route
          path='*' element={
            (
              <RequireAuth>
                <Routes>
                  <Route path='/' element={<TopPage/>}/>
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
