import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../actions/index';

const mapStateToProps = (state) => {
  const props = {
    message: state.text,
    currentChannelId: state.currentChannelId,
    messageFetchingState: state.messageFetchingState,
  };
  return props;
};

const actionCreators = {
  addMessage: actions.addMessage,
};

class ChatInput extends React.Component {
  handleSubmit = ({ message }) => {
    const { currentChannelId, addMessage, reset } = this.props;
    const name = this.context;
    const data = { attributes: { message, author: name } };
    addMessage({ data }, currentChannelId);
    reset();
  };

  render() {
    const {
      handleSubmit, submitting, pristine, error, messageFetchingState,
    } = this.props;
    const isDisabled = submitting || pristine;
    console.log(messageFetchingState, error);
    return (
      <form className="form inline d-flex" onSubmit={handleSubmit(this.handleSubmit)}>
        <div className="form-group w-100">
          <Field className="form-control" name="text" required component="input" type="text" />
        </div>
        <button type="submit" disabled={isDisabled} className="btn btn-primary btn-sm" value="Send">Send</button>
      </form>
    );
  }
}

const ConnectedChatInput = connect(mapStateToProps, actionCreators)(ChatInput);
export default reduxForm({
  form: 'newMessage',
})(ConnectedChatInput);
