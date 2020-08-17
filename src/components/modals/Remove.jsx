import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const Remove = (props) => {
  const { modalProps: { removeChannel, modalData }, modalHide } = props;
  const handleRemove = (id) => async (e) => {
    e.preventDefault();
    await removeChannel(id);
    modalHide();
  };
  return (
    <Modal show onHide={modalHide} centered>
      <Modal.Header closeButton>
       <Modal.Title>Remove Chanell</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete this channel and all its messages?
      </Modal.Body>
      <Modal.Footer>
        <Button className = "mr-2" variant="primary" onClick={modalHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleRemove(modalData.item.id)}>
          Remove
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Remove;
