import React from 'react';
import Chat from './Chat.jsx';
import PanelChannels from './PanelChannels.jsx';
import UserContext from '../context.jsx';
import getUserName from '../utils/getUserName';

const App = () => (
  <UserContext.Provider value={getUserName()}>
    <main role="application" className="row d-flex h-100 mx-auto overflow-hidden">
      <PanelChannels />
      <Chat />
  </main>
  </UserContext.Provider>
);

export default App;
