import { configureStore, createSlice, getDefaultMiddleware } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "../features/state/api";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// Create the globalSlice reducer
const globalSlice = createSlice({
  name: "global",
  initialState: {
    mode: "light",
   
  },
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

// Combine the reducers
const rootReducer = {
  [apiSlice.reducerPath]: apiSlice.reducer,
  [api.reducerPath]: api.reducer,
  auth: persistedAuthReducer,
  global: globalSlice.reducer, 
};

const combinedMiddleware = [
  ...getDefaultMiddleware(),
  apiSlice.middleware,
  api.middleware,
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

// Export setMode action creator
export const { setMode } = globalSlice.actions;
