import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useBurgerDispatch } from '../../services/store';
import { fetchLoginUser } from '../../slices/stellarBurgerSlice';

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
    ).then((data) => {
      console.log(data);
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
