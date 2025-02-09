import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import stellarBurgerSlice from '../slices/stellarBurgerSlice';

const rootReducer = () => {}; // Заменить на импорт настоящего редьюсера

// const store = configureStore({
//   reducer: rootReducer,
//   devTools: process.env.NODE_ENV !== 'production'
// });

const store = configureStore({
  reducer: {
    stellarBurger: stellarBurgerSlice
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

// export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useBurgerDispatch: () => AppDispatch = dispatchHook;
export const useBurgerSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
