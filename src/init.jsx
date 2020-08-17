import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import io from 'socket.io-client';
import './i18n';
import 'react-toastify/dist/ReactToastify.css';
import reducer, { actions } from './slices/index';
import App from './components/App.jsx';
import { getUserName } from './utils/index.js';
import UserContext from './context.jsx';

export default (gon) => {
  const socket = io();
  const username = getUserName();
  const { channels, messages, currentChannelId } = gon;

  const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
  });
  store.dispatch(actions.addMessagesSuccess(messages));
  store.dispatch(actions.addChannelsSuccess(channels));
  store.dispatch(actions.setActiveChannel(currentChannelId));

  socket.on('newMessage', (message) => store.dispatch(actions.addMessageSuccess(message)));
  socket.on('newChannel', (name) => store.dispatch(actions.addChannelSuccess(name)));
  socket.on('renameChannel', (id) => store.dispatch(actions.renameChannelSuccess(id)));
  socket.on('removeChannel', (id) => store.dispatch(actions.removeChannelSuccess(id)));

  render(
    <Provider store={store}>
      <UserContext.Provider value={username}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
