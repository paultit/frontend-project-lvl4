// @ts-check

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import faker from 'faker';
import cookies from 'js-cookie';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import gon from 'gon';

import '../assets/application.scss';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
cookies.set('username', faker.name.findName());
init(gon);
