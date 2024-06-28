import { getOrdersApi } from '../../utils/burger-api';
import {
  SerializedError,
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

const sliceName = 'orders';

export type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const ordersSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state: TOrdersState) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.error = null;
      });
  }
});

export const getOrders = createAsyncThunk(
  `orders/getOrders`,
  async () => await getOrdersApi()
);

export const ordersSelectors = ordersSlice.selectors;
export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
