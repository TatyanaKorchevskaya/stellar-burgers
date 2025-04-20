import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import {
  fetchLoginUser,
  getUserThunk,
  selectUser
} from '../../slices/stellarBurgerSlice';
import { setCookie } from '../../utils/cookie';

export const Login: FC = () => {
  const dispatch = useBurgerDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

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
        dispatch(getUserThunk());
      })
      .catch((error) => setError('Email или пароль введены неверно.'));
  };

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
