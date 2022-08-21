import authenticationReducer from '../features/authentication/authenticationSlice'
import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';

import thunk from "redux-thunk";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
    authentication: authenticationReducer,
    
});
const persistConfig = {
  key: "root",
  storage,

};
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: [thunk],
});

