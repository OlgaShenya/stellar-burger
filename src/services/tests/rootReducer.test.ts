import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../store';

describe('Тесты rootReducer', () => {
  it('инициализация хранилища', () => {
    const testStore = configureStore({ reducer: rootReducer });

    expect(rootReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      testStore.getState()
    );
  });
});
