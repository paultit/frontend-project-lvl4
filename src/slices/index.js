import { combineReducers } from 'redux';
import messages, { actions as messagesActions, addMessage } from './messages';
import channels, { actions as channelsActions, asyncActions as asyncChannelActions } from './channels';
import modals, { actions as modalsActions } from './modals';

const actions = {
  ...messagesActions,
  ...channelsActions,
  ...modalsActions,
};

const asyncActions = {
  addMessage,
  asyncChannelActions,
};

export { actions, asyncActions };

export default combineReducers({
  messages,
  channels,
  modals,
});
