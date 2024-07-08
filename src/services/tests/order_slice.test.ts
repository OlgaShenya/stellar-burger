/**
 * @jest-environment jsdom
 */
import { configureStore } from '@reduxjs/toolkit';
import { orderBurger, orderReducer, orderSlice } from '../slices/order';

describe('Тесты orderSlice', () => {
  const testData = {
    _id: 'test_id_1',
    status: 'test_status',
    name: 'test_name',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: []
  };

  test('isLoading устанавливается true', () => {
    const testStore = configureStore({
      reducer: orderReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(orderBurger([]));
    const states = testStore.getState();
    expect(states.isLoading).toBe(true);
  });

  test('Данные добавляются в store', async () => {
    const testState = orderSlice.reducer(
      {
        data: null,
        isLoading: false,
        error: null
      },
      orderBurger.fulfilled(
        {
          success: true,
          order: testData,
          name: 'testName'
        },
        '',
        []
      )
    );

    expect(testState.data).toEqual(testData);
    expect(testState.isLoading).toBe(false);
  });

  test('Данные добавляются в store (2)', async () => {
    const testStore = configureStore({
      reducer: orderReducer
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ success: true, order: testData, name: 'testName' })
      })
    ) as jest.Mock;

    await testStore.dispatch(orderBurger(['1', '2']));
    const states = testStore.getState();
    expect(states.error).toBe(null);
    expect(states.isLoading).toBe(false);
    expect(states.data).toEqual(testData);
  });

  test('Если rejected, isLoading меняется на false', async () => {
    const testStore = configureStore({
      reducer: orderReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(orderBurger(['1', '2']));
    const states = testStore.getState();
    expect(states.error).not.toBe(null);
    expect(states.isLoading).toBe(false);
  });
});
