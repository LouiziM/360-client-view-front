import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import clientSelectedReducer from '../features/state/clientSelectedSlice';

import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

// Configuration for redux-persist
const persistConfig = {
  key: "auth",
  storage: localStorage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const persistConfigClientSelected = {
  key: "clientSelected",
  storage: localStorage,
};

const persistedClientSelectedReducer = persistReducer(persistConfigClientSelected, clientSelectedReducer);

// Combine the reducers
const rootReducer = {
  auth: persistedAuthReducer,
  clientSelected: persistedClientSelectedReducer,
};

// Create the store with combined reducers and middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore the persist/PERSIST action
        ignoredActions: ["persist/PERSIST"],
      },
    })
});
// Setup listeners for queries
setupListeners(store.dispatch);

// Create the persistor for redux-persist
export const persistor = persistStore(store);