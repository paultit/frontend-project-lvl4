/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from 'i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import { actions as channelActions } from './channels';
import { showError } from '../utils/index';

const slice = createSlice({
  name: 'messages',
  initialState: {
    data: [],
  },
  reducers: {
    addMessagesSuccess: (state, { payload }) => {
      state.data = payload;
    },
    addMessageSuccess: (state, { payload }) => {
      const { data: { attributes } } = payload;
      state.data.push(attributes);
    },
  },
  extraReducers: {
    [channelActions.removeChannelSuccess]: (state, { payload }) => {
      const { data: { id } } = payload;
      state.data.filter((message) => message.channelId !== id);
    },
  },
});

const addMessage = ({ channelId, username, message }) => async () => {
  const data = { attributes: { username, message } };
  const url = routes.channelMessagesPath(channelId);
  try {
    await axios.post(url, { data });
    toast.success(i18n.t('addMessage'));
  } catch (e) {
    showError(e);
    throw e;
  }
};

const { actions } = slice;
export { actions, addMessage };
export default slice.reducer;
