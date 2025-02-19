import {
  ConstructorPage,
  Feed,
  Login,
  Profile,
  ProfileOrders,
  Register
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import { useEffect } from 'react';
import {
  closeModal,
  fetchIngredients,
  getUserThunk,
  init,
  selectIsAuthenticated,
  selectIsModalOpened
} from '../../slices/stellarBurgerSlice';
import { ProtectedRoute } from '../protected-route/protectedRoute';
import { getCookie } from '../../utils/cookie';

const App = () => {
  const dispatch = useBurgerDispatch();
  const token = getCookie('accessToken');
  const isAuth = useBurgerSelector(selectIsAuthenticated);
  const location = useLocation();
  const background = location.state?.background;
  const isModalOpen = useBurgerSelector(selectIsModalOpened);
  useEffect(() => {
    if (!isAuth && token) {
      dispatch(getUserThunk())
        .unwrap()
        .then(() => {
          dispatch(init());
        });
    } else {
      dispatch(init());
    }
  }, []);
  // TODO: избавиться от костыля
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <ConstructorPage /> */}
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute unAuthOnly>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute unAuthOnly>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
      </Routes>

      {isModalOpen && background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='hhhh'
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
