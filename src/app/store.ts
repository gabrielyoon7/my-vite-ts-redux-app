/* eslint-disable prettier/prettier */
import {
  configureStore,
  ThunkAction,
  ThunkDispatch,
  Action,
  combineReducers,
  AnyAction,
} from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import { persistReducer } from "redux-persist"
import thunk from 'redux-thunk';
// import storage from 'redux-persist/lib/storage'; // for local storage
import storage from "redux-persist/lib/storage/session"; // for session storage

const reducers = combineReducers({
  counter: counterReducer,
})

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
})

export type AppDispatch = ThunkDispatch<RootState, unknown, AnyAction>
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
