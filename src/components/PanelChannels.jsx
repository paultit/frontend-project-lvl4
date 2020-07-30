import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

const mapStateToProps = (state) => {
  const props = {
    channels: state.channels,
  };
  return props;
};

const actionCreators = {
  getMessage: actions.getMessage,
};

class PanelChannels extends React.Component {
  render() {
    const { channels } = this.props;
    return (
        <aside className="col-3 overflow-auto px-0 h-100">
            <section className="d-flex mb-2 mt-2 align-items-center">
                <span className="mb-0 py-2 pl-3">Channels:</span>
                <button type="button" className="btn btn-link p-0 ml-auto">+</button>
            </section>
            <nav role="navigation">
                <ul className="nav flex-column">
                {channels.map((channel) => (
                    <li key={channel.id} className="list-group" id="list-tab" role="tablist">
                        <a className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">{channel.name}</a>
                    </li>
                ))
                }
                </ul>
            </nav>
        </aside>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(PanelChannels);
