import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

export default (props) => {
  const { modalProps: { addChannel }, modalHide } = props;
  const { t } = useTranslation();
  const store = useSelector((state) => {
    const { channels: { data } } = state;
    const namesChannels = data.map((channel) => channel.name);
    return { namesChannels };
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().max(20).required(t('required')).notOneOf(store.namesChannels),
  });
  const dispatch = useDispatch();
  const addNewChannel = async (values, { setSubmitting }) => {
    await dispatch(addChannel(values.name));
    setSubmitting(false);
    dispatch(modalHide());
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: addNewChannel,
    onReset: () => dispatch(modalHide()),
  });
  return (
    <Modal show onHide={() => dispatch(modalHide())} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add a new channel</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
        <Modal.Body>
          <Form.Group controlId="formBasicEmail">
            <Form.Control
              required
              type="text"
              name="name"
              value={formik.values.name}
              placeholder="Enter new channel name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={formik.isSubmitting}
            />
          </Form.Group>
          {formik.errors.name
          && <h5 className="d-block invalid-feedback ml-3">{formik.errors.name}</h5>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button type="reset" variant="secondary" disabled={formik.isSubmitting}>
            Close
          </Button>
          <Button type="submit" variant="primary" disabled={formik.isSubmitting || formik.errors.name}>
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
