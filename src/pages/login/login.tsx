import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useBurgerDispatch } from '../../services/store';
import { fetchLoginUser } from '../../slices/stellarBurgerSlice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useBurgerDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchLoginUser({
        email: email,
        password: password
      })
    )
      .unwrap()
      .then((payload) => {
        localStorage.setItem('refreshToken', payload.refreshToken);
        setCookie('accessToken', payload.accessToken);
      });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
