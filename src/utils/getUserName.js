import { name } from 'faker';
import Cookies from 'js-cookie';

export default () => {
  const currentUserName = Cookies.get('userName');
  if (currentUserName) {
    return currentUserName;
  }
  const randomName = name.findName();
  Cookies.set('userName', randomName);
  return randomName;
};
