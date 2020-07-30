import React from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import * as actions from '../actions/index';

const mapStateToProps = (state) => {
  const props = {
    messages: state.messages,
  };
  return props;
};

const actionCreators = {
  getMessage: actions.getMessage,
};

class PanelMessages extends React.Component {
  componentDidMount() {
    const { getMessage } = this.props;
    const port = process.env.PORT;
    const socket = io(port);

    socket.on('newMessage', (data) => getMessage(data.data.attributes));
  }

  render() {
    const { messages } = this.props;
    return (
        <div className="pt-3 pl-3">
            {messages.map(({ id, name, text }) => (
                <span className="col-12" key={id}>
                    {name}
                    :
                    {text}
                </span>
            ))}
        </div>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(PanelMessages);
