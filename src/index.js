// index.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; 
import { store, persistor } from "./app/store";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       
       <App />
 
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
