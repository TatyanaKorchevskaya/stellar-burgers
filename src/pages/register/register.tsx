import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useBurgerDispatch } from '../../services/store';
import { fetchRegisterUser } from '../../slices/stellarBurgerSlice';
import { setCookie } from 'src/utils/cookie';

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
    ).then((payload) => {
      // localStorage
      // setCookie('accessToken', payload.accessToken)
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
