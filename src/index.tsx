import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";

import "./assets/styles/index.css";
import "react-toastify/dist/ReactToastify.css";

import App from "./App";
import { AuthProvider } from "./hooks/useAuth";
import reportWebVitals from "./reportWebVitals";
import { store, persistor } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <Provider store={store as any}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <AuthProvider>
          <App />
          <ToastContainer
            autoClose={2000}
            hideProgressBar={true}
            icon={false}
            closeButton={false}
          />
        </AuthProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
