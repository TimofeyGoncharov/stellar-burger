import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const order = createAsyncThunk('order/createOrder', orderBurgerApi);

export interface TNewOrderState {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | undefined;
}

const initialState: TNewOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: undefined
};

export const newOrder = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    resetOrder: () => initialState
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrderModalData: (state) => state.orderModalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(order.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload.order;
      })
      .addCase(order.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(order.pending, (state) => {
        state.orderRequest = true;
      });
  }
});

export const { resetOrder } = newOrder.actions;
export const { getOrderRequest, getOrderModalData } = newOrder.selectors;
