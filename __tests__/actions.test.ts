import { mockIngredientAdd } from "../mock/mockIngredientAdd";
import stellarBurgerSlice, { fetchIngredients, getUserThunk, initialState } from "../src/slices/stellarBurgerSlice";
import { TIngredient } from "../src/utils/types";

describe('Testing actons', () => {
    test('Testing pending', () => {
        const slice = stellarBurgerSlice(initialState, getUserThunk.pending(''));

        expect(slice.loading).toBe(true);
    });

    test('Testing fulfilled', () => {
        const response = [mockIngredientAdd];
        const slice = stellarBurgerSlice(initialState, fetchIngredients.fulfilled(response, ''));

        expect(slice.loading).toBe(false);
    });

    test('Testing rejected', () => {
        const response = {
            name: '',
            message: '',
        };
        const slice = stellarBurgerSlice(initialState, fetchIngredients.rejected(response, ''));

        expect(slice.loading).toBe(false);
    });
});