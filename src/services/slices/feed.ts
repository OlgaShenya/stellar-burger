import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrders: (state: TFeedState) => state.orders,
    getTotal: (state: TFeedState) => state.total,
    getTotalToday: (state: TFeedState) => state.totalToday,
    getFeedStatus: (state: TFeedState) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeeds.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const getFeeds = createAsyncThunk(`feed/getFeeds`, getFeedsApi);

export const feedSelectors = feedSlice.selectors;
export const feedActions = feedSlice.actions;
export const feedReducer = feedSlice.reducer;
