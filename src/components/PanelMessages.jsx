import React from 'react';
import { useSelector } from 'react-redux';

const PanelMessages = () => {
  const activeChannel = useSelector((state) => state.channels.channels
    .find(({ id }) => id === state.channels.activeChannelId));
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const messages = useSelector((state) => state.messages.messages
    .filter(({ channelId }) => channelId === activeChannelId));

  const renderMessages = (currentMessages) => {
    if (currentMessages.length === 0) {
      return null;
    }
    return (
      <div className="pt-3 pl-3">
        {messages.map(({ id, username, message }) => (
          <div key={id}>
            <span className="font-weight-bold mr-2">
              {username}
              :
            </span>
            <span>{message}</span>
        </div>
        ))}
      </div>
    );
  };
  return (
    <React.Fragment>
      <div className="pt-3 pl-3">
        <span className="col-12">
          {`#${activeChannel.name}`}
        </span>
      </div>
      {renderMessages(messages)}
    </React.Fragment>
  );
};

export default PanelMessages;
