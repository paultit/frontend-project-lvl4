import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import rootReducer from './reducers/index';

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
});

export default () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('chat'),
  );
};
