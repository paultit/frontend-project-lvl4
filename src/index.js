// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import gon from 'gon';

import '../assets/application.scss';
import init from './init.jsx';
// import faker from 'faker';

// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
init(gon);
console.log('it works!');
console.log('gon', gon);
