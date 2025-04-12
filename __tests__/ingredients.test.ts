import { configureStore } from '@reduxjs/toolkit';
import { store, rootReducer } from '../src/services/store';
import { mockStore } from '../mock/mockStore';
import { addIngredient, deleteIngredient, moveIngredientUp, selectConstructorItems } from '../src/slices/stellarBurgerSlice';
import { mockIngredientAdd } from '../mock/mockIngredientAdd';
import { mockIngredientDelete } from '../mock/mockIngredientDelete';
import { mockIngredientMoveUp } from '../mock/mockIngredientMoveUp';

const initStore = () => configureStore({
    reducer: rootReducer,
    preloadedState: {
        stellarBurger: mockStore,
    }
});

describe('Testing ingredients', () => {

    test('Delete ingredient', () => {
        const store = initStore();
        // console.log(selectConstructorItems(store.getState()).ingredients.length);
        
        store.dispatch(deleteIngredient(mockIngredientDelete));

        const res = selectConstructorItems(store.getState());
        // console.log(selectConstructorItems(store.getState()).ingredients.length);
        expect(res.ingredients.length).toBe(2);
    })
    test('Add ingredient', () => {
        const store = initStore();
        store.dispatch(addIngredient(mockIngredientAdd));

        const res = selectConstructorItems(store.getState());
        expect(res.ingredients.length).toEqual(3);
    });

    test('Move up ingredient', () => {
        const store = initStore();
        store.dispatch(moveIngredientUp(mockIngredientMoveUp));

        const ingredients = selectConstructorItems(store.getState()).ingredients;
        expect(ingredients[ingredients.length-2]).toEqual(mockIngredientMoveUp);
    });


});