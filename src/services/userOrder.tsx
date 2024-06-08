import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const uersOrder = createAsyncThunk('orders/ofUser', getOrdersApi);

export interface TOrdersState {
  orders: Array<TOrder>;
  isLoading: boolean;
}

const initialState: TOrdersState = {
  orders: [],
  isLoading: true
};

export const userOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    listOfOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(uersOrder.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.isLoading = false;
      })
      .addCase(uersOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uersOrder.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const { listOfOrders } = userOrdersSlice.selectors;
