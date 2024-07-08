import { configureStore } from '@reduxjs/toolkit';
import {
  fetchIngredients,
  ingredientsReducer
} from '../slices/inglidientSlice';

describe('Тесты ingredientsSlice', () => {
  const testStore = configureStore({
    reducer: ingredientsReducer
  });

  const testData = [
    { id: 1, data: 'test1' },
    { id: 2, data: 'test2' }
  ];

  test('isLoading устанавливается true', () => {
    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(fetchIngredients());
    const states = testStore.getState();
    expect(states.isLoading).toBe(true);
    expect(states.ingredients).toEqual([]);
  });

  test('Если rejected, isLoading меняется на false', async () => {
    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(fetchIngredients());
    const states = testStore.getState();
    expect(states.ingredients).toEqual([]);
    expect(states.isLoading).toBe(false);
  });

  test('Данные добавляются в store', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            data: testData
          })
      })
    ) as jest.Mock;

    await testStore.dispatch(fetchIngredients());
    const states = testStore.getState();
    expect(states.ingredients).toEqual(testData);
    expect(states.isLoading).toBe(false);
  });
});
