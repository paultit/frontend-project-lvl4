import React from 'react';
import ChatInput from './ChatInput.jsx';
import PanelMessages from './PanelMessages.jsx';

const Chat = () => (
    <section className="col-9 d-flex flex-column px-0 vw-100 border pb-3">
      <section className="overflow-auto mb-auto h-100">
        <PanelMessages />
      </section>
      <section className="w-100">
        <ChatInput />
      </section>
    </section>
);

export default Chat;
