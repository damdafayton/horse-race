import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import store from '../app/store';

export default function ContextProvider({ children }) {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>{children}</HelmetProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
