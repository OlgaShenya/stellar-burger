import { configureStore } from '@reduxjs/toolkit';
import { feedReducer, getFeeds } from '../slices/feed';

describe('Тесты feedSlice', () => {
  const testData = [
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
      reducer: feedReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(getFeeds());
    const states = testStore.getState();
    expect(states.isLoading).toBe(true);
    expect(states.orders).toEqual([]);
  });

  test('Данные добавляются в store', async () => {
    const testStore = configureStore({
      reducer: feedReducer
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

    await testStore.dispatch(getFeeds());
    const states = testStore.getState();
    expect(states.orders).toEqual(testData);
    expect(states.isLoading).toBe(false);
  });

  test('Если rejected, isLoading меняется на false', async () => {
    const testStore = configureStore({
      reducer: feedReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(getFeeds());
    const states = testStore.getState();
    expect(states.orders).toBeNull;
    expect(states.isLoading).toBe(false);
  });
});
