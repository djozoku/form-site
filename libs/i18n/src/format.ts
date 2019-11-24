import { FormatFunction } from 'i18next';

const ownFormat = (value: string, lng: string) => {
  switch (lng) {
    case 'fi-FI':
      switch (value) {
        case 'Salasana':
          return 'Salasanan';
        case 'Käyttäjänimi':
          return 'Käyttäjänimen';
        default:
          return value;
      }
    default:
      return value;
  }
};

const inFormat = (value: string, lng: string) => {
  switch (lng) {
    case 'fi-FI':
      switch (value) {
        case 'Salasana':
          return 'Salasanassa';
        default:
          return value;
      }
    default:
      return value;
  }
};

export const formatFunc: FormatFunction = (value: string, format, lng) => {
  switch (format) {
    case 'own':
      return ownFormat(value, lng!);
    case 'in':
      return inFormat(value, lng!);
    case 'lower':
      return value.toLowerCase();
    default:
      return value;
  }
};
