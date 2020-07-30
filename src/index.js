// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import gon from 'gon';

import '../assets/application.scss';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
init();
console.log('it works!');
console.log('gon', gon);
