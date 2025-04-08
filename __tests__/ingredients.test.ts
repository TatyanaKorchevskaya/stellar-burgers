import { configureStore } from '@reduxjs/toolkit';
import { store, rootReducer } from '../src/services/store';
import { mockStore } from './data/mockStore';
import { addIngredient, selectConstructorItems } from '../src/slices/stellarBurgerSlice';
import { mockIngredient } from './data/mockIngredient';

const initStore = () => configureStore({
    reducer: rootReducer,
    preloadedState: {
        stellarBurger: mockStore,
    }
});

describe('Тестирование ingredients', () => {
    test('Add ingredient', () => {
        const store = initStore();
        store.dispatch(addIngredient(mockIngredient));

        const res = selectConstructorItems(store.getState());
        expect(res.ingredients.length).toEqual(4);
    });
});