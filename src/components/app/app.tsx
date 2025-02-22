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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useBurgerDispatch, useBurgerSelector } from '../../services/store';
import { useEffect } from 'react';
import {
  closeModal,
  fetchFeed,
  fetchIngredients,
  getUserThunk,
  init,
  selectIsAuthenticated,
  selectIsModalOpened,
  selectOrders
} from '../../slices/stellarBurgerSlice';
import { ProtectedRoute } from '../protected-route/protectedRoute';
import { getCookie } from '../../utils/cookie';
import { log } from 'console';

const App = () => {
  const dispatch = useBurgerDispatch();
  const token = getCookie('accessToken');
  const isAuth = useBurgerSelector(selectIsAuthenticated);
  const location = useLocation();
  const background = location.state?.background;
  const isModalOpen = useBurgerSelector(selectIsModalOpened);
  const feed = useBurgerSelector(selectOrders);
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
  useEffect(() => {
    if (!feed.length) {
      dispatch(fetchFeed());
      console.log('fetchfeed');
    }
  }, []);
  // useEffect(()=>{
  //   Promise.all([dispatch(fetchIngredients()), dispatch(fetchFeed())])
  //   .then(()=>{
  //     console.log(useBurgerSelector(selectOrders), 'then');
  //         });

  //   console.log(useBurgerSelector(selectOrders), 'after_then');

  // }, [])
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
        <Route path='/feed/:id' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:id'
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isModalOpen && background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title='Описание ингредиента'
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:id'
            element={
              <Modal
                title='Заказ'
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:id'
            element={
              <Modal
                title='Заказ'
                onClose={() => {
                  dispatch(closeModal());
                }}
              >
                <ProtectedRoute>
                  <OrderInfo />
                </ProtectedRoute>
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
