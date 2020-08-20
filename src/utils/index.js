import i18n from 'i18next';
import { toast } from 'react-toastify';

const showError = (err) => {
  const key = err.response ? 'server' : 'network';
  toast.error(i18n.t(key));
};

export default showError;
