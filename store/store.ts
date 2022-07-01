import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { default as sets } from "./reducers/sets";
import { default as cards } from "./reducers/cards";
import { default as collection } from "./reducers/collection";

export const store = configureStore({
  reducer: {
    sets,
    cards,
    collection,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
