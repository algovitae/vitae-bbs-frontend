import {useRecoilValueLoadable} from 'recoil';
import {loggedInUserNameSelector} from '../../selectors/auth';

export function LoggedInUserName() {
  const nameLoadable = useRecoilValueLoadable(loggedInUserNameSelector);
  return (
    <span>
      {nameLoadable.state === 'hasValue' ? nameLoadable.contents : '...'}
    </span>
  );
}
