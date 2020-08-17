import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import * as Yup from 'yup';

export default (props) => {
  const { modalProps: { renameChannel, modalData }, modalHide } = props;
  const store = useSelector((state) => {
    const { channels: { channels } } = state;
    const namesChannels = channels.map((channel) => channel.name);
    return { namesChannels };
  });
  const { channels: { validationState } } = useSelector((state) => state);
  const validationSchema = Yup.object({
    name: Yup.string().required().notOneOf(store.namesChannels),
  });
  const renameCurrentChannel = async (values, { setSubmitting }) => {
    const channelData = { name: values.name, id: modalData.item.id };
    await renameChannel(channelData);
    setSubmitting(false);
    modalHide();
  };

  const formik = useFormik({
    initialValues: {
      name: modalData.item.name,
    },
    validationSchema,
    onSubmit: renameCurrentChannel,
    onReset: () => modalHide(),
  });
  return (
    <Modal show onHide={modalHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Rename Channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              required
              type="text"
              name="name"
              value={formik.values.name}
              placeholder="Enter New Channel Name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
          </Form.Group>
          {formik.errors.message
          && <h5 className="d-block invalid-feedback ml-3">{formik.errors.name}</h5>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button type="reset" variant="secondary" disabled={formik.isSubmitting}>
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting || formik.errors.name || validationState === 'invalid'}>
            Rename
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
