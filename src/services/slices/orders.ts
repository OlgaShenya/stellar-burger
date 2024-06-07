import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

const sliceName = 'orders';

export type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false
};

const ordersSlice = createSlice({
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
      })
      .addCase(getOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export const getOrders = createAsyncThunk(`orders/getOrders`, getOrdersApi);

export const ordersSelectors = ordersSlice.selectors;
export const ordersActions = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
