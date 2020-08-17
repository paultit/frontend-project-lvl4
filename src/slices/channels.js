/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from 'i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import { showError } from '../utils/index';

const slice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
    activeChannelId: 1,
    validationState: 'valid',
  },
  reducers: {
    addChannelsSuccess: (state, { payload }) => {
      state.channels = payload;
    },
    addChannelSuccess: (state, { payload }) => {
      const { data: { attributes } } = payload;
      state.channels.push(attributes);
      state.validationState = 'valid';
    },
    addChannelFailure(state) {
      state.validationState = 'invalid';
    },
    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload;
    },
    renameChannelSuccess: (state, { payload }) => {
      const { data: { attributes: { id, name } } } = payload;
      const channel = state.channels.find((item) => item.id === id);
      channel.name = name;
    },
    renameChannelFailure(state) {
      state.validationState = 'invalid';
    },
    removeChannelSuccess: (state, { payload }) => {
      const { data: { id } } = payload;
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.activeChannelId = state.channels[0].id;
    },
    removeChannelFailure(state) {
      state.validationState = 'invalid';
    },
  },
});

const addChannel = (name) => async (dispatch) => {
  const data = { attributes: { name } };
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data });
    toast.success(i18n.t('add'));
  } catch (e) {
    dispatch(slice.actions.addChannelFailure());
    showError(e);
    throw e;
  }
};

const renameChannel = ({ id, name }) => async (dispatch) => {
  const data = { attributes: { name } };
  const url = routes.channelPath(id);
  try {
    await axios.patch(url, { data });
    toast.success(i18n.t('rename'));
  } catch (e) {
    dispatch(slice.actions.renameChannelFailure());
    showError(e);
    throw e;
  }
};

const removeChannel = (id) => async (dispatch) => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
    toast.success(i18n.t('remove'));
  } catch (e) {
    dispatch(slice.actions.removeChannelFailure());
    showError(e);
    throw e;
  }
};

const { actions } = slice;
const asyncActions = {
  addChannel,
  renameChannel,
  removeChannel,
};

export {
  actions,
  asyncActions,
};
export default slice.reducer;
