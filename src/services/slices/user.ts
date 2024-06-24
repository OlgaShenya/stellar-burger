import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  refreshToken
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  isLoading: boolean;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  isLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    getUser: (state: TUserState) => state.data,
    getAuthStatus: (state: TUserState) => state.isAuthChecked,
    getState: (state: TUserState) => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.isLoading = false;
        state = initialState;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.user;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = null;
      })
      .addCase(refreshUserToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshUserToken.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  }
});

export const checkUserAuth = createAsyncThunk(`user/checkUserAuth`, getUserApi);

export const refreshUserToken = createAsyncThunk(
  `user/refreshUserToken`,
  refreshToken
);

export const loginUser = createAsyncThunk(
  `user/loginUser`,
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const registerUser = createAsyncThunk(
  `user/registerUser`,
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const updateUser = createAsyncThunk(
  `user/updateUser`,
  async (userData: TRegisterData) => {
    const data = await updateUserApi(userData);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(`user/logoutUser`, async () =>
  logoutApi().then((data) => {
    if (data.success) {
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    }
  })
);

export const userSelectors = userSlice.selectors;
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
