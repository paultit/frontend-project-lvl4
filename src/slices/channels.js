/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import i18n from 'i18next';
import { toast } from 'react-toastify';
import routes from '../routes.js';
import showError from '../utils/index';

const slice = createSlice({
  name: 'channels',
  initialState: {
    data: [],
    activeChannelId: 1,
  },
  reducers: {
    addChannelsSuccess: (state, { payload }) => {
      state.data = payload;
    },
    addChannelSuccess: (state, { payload }) => {
      const { data: { attributes } } = payload;
      state.data.push(attributes);
    },
    setActiveChannel: (state, { payload }) => {
      state.activeChannelId = payload;
    },
    renameChannelSuccess: (state, { payload }) => {
      const { data: { attributes: { id, name } } } = payload;
      const channel = state.data.find((item) => item.id === id);
      channel.name = name;
    },
    removeChannelSuccess: (state, { payload }) => {
      const { data: { id } } = payload;
      state.data = state.data.filter((channel) => channel.id !== id);
      state.activeChannelId = state.data[0].id;
    },
  },
});

const addChannel = (name) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelsPath();
  try {
    await axios.post(url, { data });
    toast.success(i18n.t('add'));
  } catch (e) {
    showError(e);
    throw e;
  }
};

const renameChannel = ({ id, name }) => async () => {
  const data = { attributes: { name } };
  const url = routes.channelPath(id);
  try {
    await axios.patch(url, { data });
    toast.success(i18n.t('rename'));
  } catch (e) {
    showError(e);
    throw e;
  }
};

const removeChannel = (id) => async () => {
  const url = routes.channelPath(id);
  try {
    await axios.delete(url);
    toast.success(i18n.t('remove'));
  } catch (e) {
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
