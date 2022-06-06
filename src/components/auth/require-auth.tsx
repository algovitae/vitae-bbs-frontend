import {Navigate, useLocation} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {loggedInUserIdSelector} from '../../selectors/auth';

export function RequireAuth({children, redirect}: {children: JSX.Element; redirect?: boolean}) {
  const userId = useRecoilValue(loggedInUserIdSelector);
  const location = useLocation();

  if (!userId) {
    if (redirect) {
      return <Navigate replace to='/login' state={{from: location}}/>;
    }

    return null;
  }

  return children;
}

