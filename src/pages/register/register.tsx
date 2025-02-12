import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useBurgerDispatch } from '../../services/store';
import { fetchRegisterUser } from '../../slices/stellarBurgerSlice';
import { setCookie } from '../../utils/cookie';
import { refreshToken } from '@api';
import { getUserThunk } from '../../slices/stellarBurgerSlice';

export const Register: FC = () => {
  const dispatch = useBurgerDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchRegisterUser({
        email: email,
        name: userName,
        password: password
      })
    )
      .unwrap()
      .then((payload) => {
        localStorage.setItem('refreshToken', payload.refreshToken);
        setCookie('accessToken', payload.accessToken);
        dispatch(getUserThunk());
      });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
