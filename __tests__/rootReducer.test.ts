import { store, rootReducer } from '../src/services/store';

describe('Тестирование rootReducer', () => {
    test('Вызов rootReducer', () => {
        const start = store.getState();
        expect(rootReducer(undefined, { type: 'UnknownAction' }))
            .toEqual(start)
    });
});