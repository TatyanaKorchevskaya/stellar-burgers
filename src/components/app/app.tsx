import { ConstructorPage, Feed } from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Route, Routes } from 'react-router-dom';
import { useBurgerDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredients, init } from '../../slices/stellarBurgerSlice';

const App = () => {
  const dispatch = useBurgerDispatch();
  useEffect(() => {
    dispatch(init());
  }, []);
  // TODO: избавиться от костыля 
  useEffect(() => {
    dispatch(fetchIngredients());
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <ConstructorPage /> */}
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
      </Routes>
    </div>
  );
};

export default App;
