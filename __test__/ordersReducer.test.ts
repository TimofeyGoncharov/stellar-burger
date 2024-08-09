import {
  fetchOrder,
  fetchOrders,
  createOrder,
  resetOrderModalData,
  ordersInitialState
} from '../src/services/slices';

import reducer from '../src/services/slices/orders';

const ordersMockData = [
  {
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    _id: '6622337897ede0001d0666b5',
    status: 'done',
    name: 'EXAMPLE_NAME',
    createdAt: '2024-04-19T09:03:52.748Z',
    updatedAt: '2024-04-19T09:03:58.057Z',
    number: 38321
  }
];

describe('ordersReducer', () => {
  test('defualt modal', () => {
    const _initialState = {
      isOrderLoading: true,
      isOrdersLoading: true,
      orderRequest: false,
      orderModalData: ordersMockData[0],
      error: null,
      data: []
    };

    const state = reducer(_initialState, resetOrderModalData());

    expect(state.orderModalData).toBeNull();
    expect(state.data).toHaveLength(0);
    expect(state.error).toBeNull();
    expect(state.orderRequest).toBeFalsy();
    expect(state.isOrdersLoading).toBeTruthy();
    expect(state.isOrderLoading).toBeTruthy();
  });

  describe('async function get oreder: fetchOrders', () => {
    test('fetchOrders.pending', () => {
      const state = reducer(ordersInitialState, fetchOrders.pending('pending'));

      expect(state.isOrdersLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('fetchOrders.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        fetchOrders.fulfilled(ordersMockData, 'fulfilled')
      );

      expect(state.isOrdersLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(ordersMockData);
    });

    test('fetchOrders.rejected', () => {
      const error = 'fetchOrders.rejected';

      const state = reducer(
        ordersInitialState,
        fetchOrders.rejected(new Error(error), 'rejected')
      );

      expect(state.isOrdersLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });

  describe('async function get order by id: fetchOrder', () => {
    test('fetchOrder.pending', () => {
      const state = reducer(
        ordersInitialState,
        fetchOrder.pending('pending', ordersMockData[0].number)
      );

      expect(state.isOrderLoading).toBeTruthy();
    });

    test('РfetchOrder.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        fetchOrder.fulfilled(
          ordersMockData[0],
          'fulfilled',
          ordersMockData[0].number
        )
      );

      expect(state.isOrderLoading).toBeFalsy();
      expect(state.orderModalData).toEqual(ordersMockData[0]);
    });

    test('fetchOrder.rejected', () => {
      const error = 'fetchOrder.rejected';

      const state = reducer(
        ordersInitialState,
        fetchOrder.rejected(new Error(error), 'rejected', -1)
      );

      expect(state.isOrderLoading).toBeFalsy();
    });
  });

  describe('async function create oreder: createOrder', () => {
    test('createOrder.pending', () => {
      const state = reducer(
        ordersInitialState,
        createOrder.pending('pending', ordersMockData[0].ingredients)
      );

      expect(state.orderRequest).toBeTruthy();
    });

    test('createOrder.fulfilled', () => {
      const state = reducer(
        ordersInitialState,
        createOrder.fulfilled(
          { order: ordersMockData[0], name: 'EXAMPLE' },
          'fulfilled',
          ordersMockData[0].ingredients
        )
      );

      expect(state.orderRequest).toBeFalsy();
      expect(state.orderModalData).toEqual(ordersMockData[0]);
    });

    test('createOrder.rejected', () => {
      const error = 'createOrder.rejected';

      const state = reducer(
        ordersInitialState,
        createOrder.rejected(new Error(error), 'rejected', [])
      );

      expect(state.orderRequest).toBeFalsy();
    });
  });
});
