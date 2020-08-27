import React from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Chat from './Chat.jsx';
import ChannelsBox from './ChannelsBox.jsx';
import getModal from './modals/index';
import { actions, asyncActions } from '../slices';

const renderModal = ({ modalData, modalHide, modalProps }) => {
  if (!modalData.type) {
    return null;
  }
  const Modal = getModal(modalData.type);
  return <Modal modalProps={modalProps} modalHide={modalHide} />;
};
toast.configure({
  position: 'top-center',
  autoClose: 20000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
});

const App = () => {
  const modalData = useSelector((state) => state.modals);
  const { modalHide } = actions;
  const { addChannel, removeChannel, renameChannel } = asyncActions.asyncChannelActions;
  const modalProps = {
    modalData,
    addChannel,
    removeChannel,
    renameChannel,
  };
  return (
    <main className="row d-flex h-100 mx-auto overflow-hidden">
      <ChannelsBox />
      <Chat />
      {renderModal({ modalData, modalHide, modalProps })}
    </main>
  );
};

export default App;
