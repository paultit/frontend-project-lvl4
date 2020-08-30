import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { actions } from '../slices';

const ChannelsBox = () => {
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);
  const channels = useSelector((state) => state.channels.data);
  const dispatch = useDispatch();

  const handleClick = (id) => (e) => {
    e.preventDefault();
    dispatch(actions.setActiveChannel(id));
  };

  const handleModalShow = (type, channel = null) => (e) => {
    e.preventDefault();
    dispatch(actions.modalShow({ type, channel }));
  };
  const btnClass = (id) => cn({
    'nav-link': true,
    btn: true,
    'btn-outline-primary': true,
    'btn-sm': true,
    'w-100': true,
    border: true,
    rounded: true,
    active: activeChannelId === id,
  });
  return (
        <aside className="col-3 overflow-auto px-15 h-100">
            <section className="d-flex mb-2 mt-2 mr-2 align-items-center">
                <span className="mb-0 py-2">Channels:</span>
                <button type="button" className="btn btn-link p-0 ml-auto" onClick={handleModalShow('adding')}>
                  <FontAwesomeIcon icon={faPlus} />
                </button>
            </section>
            <nav role="navigation">
                <ul className="nav flex-column">
                {channels.map((channel) => (
                  <li key={channel.id} className="d-inline-flex mr-1 mb-2">
                    {channel.removable
                      ? <React.Fragment>
                          <a className={btnClass(channel.id)} id="list-home-list" href="#list-home"onClick={handleClick(channel.id)}>{`${channel.name}`}</a>
                          <button type="button" onClick={handleModalShow('renaming', channel)}>
                              <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button type="button" onClick={handleModalShow('removing', channel)}>
                              <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </React.Fragment>
                      : <a className={btnClass(channel.id)} id="list-home-list" href="#list-home" onClick={handleClick(channel.id)}>{`${channel.name}`}</a>
                    }
                  </li>
                ))},
              </ul>
            </nav>
        </aside>
  );
};

export default ChannelsBox;
