import {
  fetchUser,
  register,
  login,
  logout,
  userInitialState
} from '../src/services/slices';

import reducer from '../src/services/slices/user';

const userMockData = {
  email: 'example@example.mail',
  name: 'Example'
};

const registerMockData = {
  email: 'example@example.mail',
  name: 'Example',
  password: 'Example'
};

const loginMockData = {
  email: 'example@example.mail',
  password: 'Example'
};

describe('userReducer', () => {
  describe('async function for registration: register', () => {
    test('register.pending', () => {
      const state = reducer(
        userInitialState,
        register.pending('pending', registerMockData)
      );

      expect(state.registerError).toBeUndefined();
    });

    test('register.fulfilled', () => {
      const state = reducer(
        userInitialState,
        register.fulfilled(userMockData, 'fulfilled', registerMockData)
      );

      expect(state.isAuthenticated).toBeTruthy();
      expect(state.registerError).toBeUndefined();
      expect(state.data).toEqual(userMockData);
    });

    test('register.rejected', () => {
      const error = 'register.rejected';

      const state = reducer(
        userInitialState,
        register.rejected(new Error(error), 'rejected', registerMockData)
      );

      expect(state.registerError?.message).toEqual(error);
    });
  });

  describe('async function for login in profile: login', () => {
    test('login.pending', () => {
      const state = reducer(
        userInitialState,
        login.pending('pending', loginMockData)
      );

      expect(state.loginError).toBeUndefined();
    });

    test('login.fulfilled', () => {
      const state = reducer(
        userInitialState,
        login.fulfilled(userMockData, 'fulfilled', loginMockData)
      );

      expect(state.isAuthenticated).toBeTruthy();
      expect(state.loginError).toBeUndefined();
      expect(state.data).toEqual(userMockData);
    });

    test('login.rejected', () => {
      const error = 'login.rejected';

      const state = reducer(
        userInitialState,
        login.rejected(new Error(error), 'rejected', loginMockData)
      );

      expect(state.loginError?.message).toEqual(error);
    });
  });

  describe('async function logout from profile: logout', () => {
    test('logout.fulfilled', () => {
      const state = reducer(
        userInitialState,
        logout.fulfilled(undefined, 'fulfilled')
      );

      expect(state.isAuthenticated).toBeFalsy();
      expect(state.data).toEqual({
        email: '',
        name: ''
      });
    });
  });

  describe('async function auth: fetchUser', () => {
    test('fetchUser.fulfilled', () => {
      const state = reducer(
        userInitialState,
        fetchUser.fulfilled(userMockData, 'fulfilled')
      );

      expect(state.isAuthenticated).toBeTruthy();
      expect(state.isAuthChecked).toBeTruthy();
      expect(state.data).toEqual(userMockData);
    });

    test('fetchUser.rejected', () => {
      const error = 'fetchUser.rejected';

      const state = reducer(
        userInitialState,
        fetchUser.rejected(new Error(error), 'rejected')
      );

      expect(state.isAuthenticated).toBeFalsy();
      expect(state.isAuthChecked).toBeTruthy();
    });
  });
});
