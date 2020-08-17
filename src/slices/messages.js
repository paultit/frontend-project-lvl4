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
    messages: [],
    validationState: 'valid',
  },
  reducers: {
    addMessagesSuccess: (state, { payload }) => {
      state.messages = payload;
    },
    addMessageSuccess: (state, { payload }) => {
      const { data: { attributes } } = payload;
      state.messages.push(attributes);
      state.validationState = 'valid';
    },
    addMessageFailure(state) {
      state.validationState = 'invalid';
    },
  },
  extraReducers: {
    [channelActions.removeChannelSuccess]: (state, { payload }) => {
      const { data: { id } } = payload;
      state.messages.filter((message) => message.channelId !== id);
    },
  },
});

const addMessage = ({ channelId, username, message }) => async (dispatch) => {
  const data = { attributes: { username, message } };
  const url = routes.channelMessagesPath(channelId);
  try {
    await axios.post(url, { data });
    toast.success(i18n.t('addMessage'));
  } catch (e) {
    dispatch(slice.actions.addMessageFailure());
    showError(e);
  }
};

const { actions } = slice;
export { actions, addMessage };
export default slice.reducer;
