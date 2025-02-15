import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useBurgerDispatch } from '../../services/store';
import { fetchLogout } from '../../slices/stellarBurgerSlice';
import { deleteCookie } from '../../utils/cookie';
import { refreshToken } from '@api';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useBurgerDispatch();
  const handleLogout = () => {
    dispatch(fetchLogout())
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          deleteCookie('accessToken');
          localStorage.removeItem('refreshToken');
        }
      });
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
