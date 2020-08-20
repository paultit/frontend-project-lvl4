import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { asyncActions } from '../slices';
import UserContext from '../context.jsx';

const ChatInput = () => {
  const username = useContext(UserContext);
  const { t } = useTranslation();
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    message: Yup.string().required(t('Required field')),
  });
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.message.length === 0) {
      return;
    }
    const data = {
      channelId: activeChannelId,
      username,
      message: values.message,
    };
    await dispatch(asyncActions.addMessage(data));
    setSubmitting(false);
    resetForm();
  };
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <Form onSubmit={formik.handleSubmit} className="mx-3">
      <Form.Group className="w-100 d-flex flex-wrap mb-0">
        <Form.Control
          name="message"
          type="text"
          placeholder={'Enter text'}
          onChange={formik.handleChange}
          value={formik.values.message}
          disabled={formik.isSubmitting}
        />
        <Button className="ml-2" type="submit" variant="primary" disabled={formik.isSubmitting || formik.errors.message}>
          Send
        </Button>
        {formik.errors.message
          && <h5 className="d-block invalid-feedback">{formik.errors.message}</h5>
        }
      </Form.Group>
    </Form>
  );
};

export default ChatInput;
