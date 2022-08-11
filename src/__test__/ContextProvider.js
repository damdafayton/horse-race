import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../app/store';

export default function ContextProvider({ children }) {
  return (
    <React.StrictMode>
      <Provider store={store}>{children}</Provider>
    </React.StrictMode>
  );
}
