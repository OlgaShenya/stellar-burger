/**
 * @jest-environment jsdom
 */
import { configureStore } from '@reduxjs/toolkit';
import {
  getOrders,
  initialState,
  ordersReducer,
  ordersSlice
} from '../slices/orders';
import '@testing-library/jest-dom';
import { TOrder } from '@utils-types';
import { stat } from 'fs';

describe('Тесты ordersSlice', () => {
  const testData: TOrder[] = [
    {
      _id: 'test_id_1',
      status: 'test_status',
      name: 'test_name',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    },
    {
      _id: 'test_id_1',
      status: 'test_status',
      name: 'test_name',
      createdAt: '',
      updatedAt: '',
      number: 1,
      ingredients: []
    }
  ];

  test('isLoading устанавливается true', () => {
    const testStore = configureStore({
      reducer: ordersReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(getOrders());
    const states = testStore.getState();
    expect(states.isLoading).toBe(true);
  });

  test('Данные добавляются в store', async () => {
    const testStore = configureStore({
      reducer: ordersReducer
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            orders: testData
          })
      })
    ) as jest.Mock;

    await testStore.dispatch(getOrders());
    const states = testStore.getState();
    expect(states.error).toBe(null);
    expect(states.isLoading).toBe(false);
    expect(states.orders).toEqual(testData);
  });

  test('Если rejected, isLoading меняется на false', async () => {
    const testStore = configureStore({
      reducer: ordersReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(getOrders());
    const states = testStore.getState();
    expect(states.isLoading).toBe(false);
  });
});
