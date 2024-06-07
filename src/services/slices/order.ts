import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export interface TOrderState {
  data: TOrder | null;
  isLoading: boolean;
}

const initialState: TOrderState = {
  data: null,
  isLoading: false
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => initialState
  },
  selectors: {
    getOrderData: (state: TOrderState) => state.data,
    getOrderStatus: (state: TOrderState) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.order;
      });
  }
});

export const orderBurger = createAsyncThunk(
  `order/orderBurger`,
  async (orderData: string[]) => await orderBurgerApi(orderData)
);
export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
