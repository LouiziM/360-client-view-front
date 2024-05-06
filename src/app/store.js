import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

import authReducer from '../features/auth/authSlice';
import clientSelectedReducer from '../features/state/clientSelectedSlice';

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { setupListeners } from "@reduxjs/toolkit/query";
import { clientApiSlice } from "../features/state/clientApiSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "auth",
  storage: storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const persistConfigClientSelected = {
  key: "clientSelected",
  storage: storage,
};

const persistedClientSelectedReducer = persistReducer(persistConfigClientSelected, clientSelectedReducer);

// Combine the reducers
const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: persistedAuthReducer,
  clientSelected: persistedClientSelectedReducer,
  [clientApiSlice.reducerPath]: clientApiSlice.reducer, 
};

const combinedMiddleware = [
  ...getDefaultMiddleware(),
  apiSlice.middleware,
];

// Create the store with combined reducers and middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: combinedMiddleware,
});

// Setup listeners for queries
setupListeners(store.dispatch);

// Create the persistor for redux-persist
export const persistor = persistStore(store);