import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients';
import { mozaikaBurgerSlice } from './mozaikaBurger';
import { userSlice } from './user';
import { feedsSlice } from './feed';
import { newOrder } from './order';
import { userOrdersSlice } from './userOrder';

const store = configureStore({
  reducer: {
    [ingredientsSlice.name]: ingredientsSlice.reducer,
    [mozaikaBurgerSlice.name]: mozaikaBurgerSlice.reducer,
    [userSlice.name]: userSlice.reducer,
    [feedsSlice.name]: feedsSlice.reducer,
    [newOrder.name]: newOrder.reducer,
    [userOrdersSlice.name]: userOrdersSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
