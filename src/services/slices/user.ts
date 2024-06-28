import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi,
  refreshToken
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, setCookie } from '../../utils/cookie';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  isLoading: false,
  error: null
};

export const userSlice = createSlice({
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
        state.data = null;
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.data = null;
        state.error = action.error.message!;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.error = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.data = null;
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.data = null;
        state.error = action.error.message!;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.data = null;
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.data = null;
        state.error = action.error.message!;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.data = null;
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.data = null;
        state.error = action.error.message!;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.error = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.data = null;
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.data = null;
        state.error = action.error.message!;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.data = null;
        state.error = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(refreshUserToken.pending, (state) => {
        state.error = null;
        state.isAuthChecked = false;
        state.isLoading = true;
      })
      .addCase(refreshUserToken.rejected, (state, action) => {
        state.error = action.error.message!;
        state.isAuthChecked = true;
        state.isLoading = false;
      })
      .addCase(refreshUserToken.fulfilled, (state, action) => {
        state.error = null;
        state.isLoading = false;
        state.isAuthChecked = true;
      });
  }
});

export const checkUserAuth = createAsyncThunk(
  `user/checkUserAuth`,
  async () => await getUserApi()
);

export const refreshUserToken = createAsyncThunk(
  `user/refreshUserToken`,
  async () => await refreshToken()
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

export const logoutUser = createAsyncThunk(
  `user/logoutUser`,
  async () =>
    await logoutApi().then((data) => {
      if (data.success) {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      }
    })
);

export const userSelectors = userSlice.selectors;
export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
