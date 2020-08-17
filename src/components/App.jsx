import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Chat from './Chat.jsx';
import PanelChannels from './PanelChannels.jsx';
import getModal from './modals/index';
import { actions, asyncActions } from '../slices';

const mapStateToProps = (state) => {
  const props = {
    modalData: state.modals,
  };
  return props;
};

const actionCreators = {
  addChannel: asyncActions.asyncChannelActions.addChannel,
  renameChannel: asyncActions.asyncChannelActions.renameChannel,
  removeChannel: asyncActions.asyncChannelActions.removeChannel,
  modalHide: actions.modalHide,
};

const renderModal = ({ modalData, modalHide, modalProps }) => {
  if (modalData.type === null) {
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

const App = (props) => {
  const {
    modalData,
    modalHide,
    addChannel,
    removeChannel,
    renameChannel,
  } = props;

  const modalProps = {
    modalData,
    addChannel,
    removeChannel,
    renameChannel,
  };
  return (
    <main className="row d-flex h-100 mx-auto overflow-hidden">
      <PanelChannels />
      <Chat />
      {renderModal({ modalData, modalHide, modalProps })}
    </main>
  );
};

export default connect(mapStateToProps, actionCreators)(App);
