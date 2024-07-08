/**
 * @jest-environment jsdom
 */
import { configureStore } from '@reduxjs/toolkit';
import {
  checkUserAuth,
  initialState,
  loginUser,
  logoutUser,
  refreshUserToken,
  registerUser,
  updateUser,
  userActions,
  userReducer,
  userSlice
} from '../slices/user';
import 'jest-localstorage-mock';

describe('Тесты регистрации', () => {
  const testRegisterData = {
    email: 'test@test.ru',
    password: 'test',
    name: 'test'
  };

  test('Pending', () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(registerUser(testRegisterData));
    const states = testStore.getState();
    expect(states.isAuthChecked).toBe(false);
    expect(states.isLoading).toBe(true);
  });

  test('Fulfilled', async () => {
    const testState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(testRegisterData, '', testRegisterData)
    );

    expect(testState.isLoading).toBe(false);
    expect(testState.isAuthChecked).toBe(true);
    expect(testState.error).toBe(null);
    expect(testState.data).toEqual(testRegisterData);
  });

  test('Reject', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(registerUser(testRegisterData));
    const states = testStore.getState();
    expect(states.data).toEqual(null);
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).not.toBe(null);
  });
});

describe('Тесты updateUser', () => {
  const testLoginData = {
    email: 'test@test.ru',
    name: 'test',
    password: 'test'
  };

  test('Pending', () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(updateUser(testLoginData));
    const states = testStore.getState();
    expect(states.isAuthChecked).toBe(false);
    expect(states.isLoading).toBe(true);
  });

  test('Fulfilled', async () => {
    const testState = userSlice.reducer(
      initialState,
      updateUser.fulfilled(testLoginData, '', testLoginData)
    );

    expect(testState.isLoading).toBe(false);
    expect(testState.isAuthChecked).toBe(true);
    expect(testState.error).toBe(null);
    expect(testState.data).toEqual(testLoginData);
  });

  test('Reject', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(updateUser(testLoginData));
    const states = testStore.getState();
    expect(states.data).toEqual(null);
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).not.toBe(null);
  });
});

describe('Тесты входа(login)', () => {
  const testLoginData = {
    email: 'test@test.ru',
    name: 'test',
    password: 'test'
  };

  test('Pending', () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(loginUser(testLoginData));
    const states = testStore.getState();
    expect(states.isAuthChecked).toBe(false);
    expect(states.isLoading).toBe(true);
  });

  test('Fulfilled', async () => {
    const testState = userSlice.reducer(
      initialState,
      loginUser.fulfilled(testLoginData, '', testLoginData)
    );

    expect(testState.isLoading).toBe(false);
    expect(testState.isAuthChecked).toBe(true);
    expect(testState.error).toBe(null);
    expect(testState.data).toEqual(testLoginData);
  });

  test('Reject', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(loginUser(testLoginData));
    const states = testStore.getState();
    expect(states.data).toEqual(null);
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).not.toBe(null);
  });
});

describe('Тесты выхода(logout)', () => {
  test('Pending', () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(logoutUser());
    const states = testStore.getState();
    expect(states.isAuthChecked).toBe(false);
    expect(states.isLoading).toBe(true);
  });

  test('Fulfilled', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            refreshToken: 'test',
            accessToken: 'test'
          })
      })
    ) as jest.Mock;

    await testStore.dispatch(logoutUser());
    const states = testStore.getState();
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).toBe(null);
    expect(states.data).toBe(null);
  });

  test('Reject', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(logoutUser());
    const states = testStore.getState();
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).not.toBe(null);
  });
});

describe('Тесты обновления токена', () => {
  test('Pending', () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(refreshUserToken());
    const states = testStore.getState();
    expect(states.isAuthChecked).toBe(false);
    expect(states.isLoading).toBe(true);
  });

  test('Fulfilled', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            refreshToken: 'test',
            accessToken: 'test'
          })
      })
    ) as jest.Mock;

    await testStore.dispatch(refreshUserToken());
    const states = testStore.getState();
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).toBe(null);
  });

  test('Reject', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(refreshUserToken());
    const states = testStore.getState();
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).not.toBe(null);
  });
});

describe('Тесты проверки пользователя', () => {
  const testRegisterData = {
    email: 'test@test.ru',
    name: 'test'
  };

  test('Pending', () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;

    testStore.dispatch(checkUserAuth());
    const states = testStore.getState();
    expect(states.isAuthChecked).toBe(false);
    expect(states.isLoading).toBe(true);
    expect(states.data).toBe(null);
  });

  test('Fulfilled', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            success: true,
            user: testRegisterData
          })
      })
    ) as jest.Mock;

    await testStore.dispatch(checkUserAuth());
    const states = testStore.getState();
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).toBe(null);
    expect(states.data).toEqual(testRegisterData);
  });

  test('Reject', async () => {
    const testStore = configureStore({
      reducer: userReducer
    });

    global.fetch = jest.fn(() => Promise.reject()) as jest.Mock;

    await testStore.dispatch(checkUserAuth());
    const states = testStore.getState();
    expect(states.data).toEqual(null);
    expect(states.isLoading).toBe(false);
    expect(states.isAuthChecked).toBe(true);
    expect(states.error).not.toBe(null);
  });
});

test('Тест Actions.authCheck', () => {
  const testStore = configureStore({
    reducer: userReducer
  });
  testStore.dispatch(userActions.authCheck());
  const states = testStore.getState();
  expect(states.isAuthChecked).toBe(true);
});
