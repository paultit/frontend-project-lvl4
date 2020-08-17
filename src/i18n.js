import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      network: 'Network error. \n You can try reloading the page',
      server: 'Server error at the moment',
      add: 'Channel added',
      rename: 'Channel renamed',
      remove: 'Channel removed',
      addMessage: 'Message added',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    debug: true,
    fallbacklng: false,
  });

export default i18n;
