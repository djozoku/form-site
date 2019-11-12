import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from '@form/i18n/lib/en/common.json';
import enValidation from '@form/i18n/lib/en/validation.json';
import fiCommon from '@form/i18n/lib/fi/common.json';
import fiValidation from '@form/i18n/lib/fi/validation.json';
import { formatFunc } from '@form/i18n';

i18n
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        common: enCommon,
        validation: enValidation
      },
      fi: {
        common: fiCommon,
        validation: fiValidation
      }
    },
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false,
      format: formatFunc
    }
  });

export default i18n;
