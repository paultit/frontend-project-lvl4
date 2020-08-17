import { name } from 'faker';
import Cookies from 'js-cookie';
import i18n from 'i18next';
import { toast } from 'react-toastify';

export const getUserName = () => {
  const currentUserName = Cookies.get('userName');
  if (currentUserName) {
    return currentUserName;
  }
  const randomName = name.findName();
  Cookies.set('userName', randomName);
  return randomName;
};

export const showError = (err) => {
  const key = err.response ? 'server' : 'network';
  toast.error(i18n.t(key));
};
