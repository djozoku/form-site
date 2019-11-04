import i18next from 'i18next';

export const realEmail = () => i18next.t('validation:realemail');

export const required = (field: string) => () =>
  i18next.t('validation:required', { field: i18next.t(`common:${field}`) });

export const length = (field: string, range: string) => () =>
  i18next.t('validation:length', { field: i18next.t(`common:${field}`), range });

export const whitespace = (field: string) => () =>
  i18next.t('validation:whitespace', { field: i18next.t(`common:${field}`) });

export const uppercase = (field: string) => () =>
  i18next.t('validation:uppercase', { field: i18next.t(`common:${field}`) });

export const lowercase = (field: string) => () =>
  i18next.t('validation:lowercase', { field: i18next.t(`common:${field}`) });

export const number = (field: string) => () =>
  i18next.t('validation:number', { field: i18next.t(`common:${field}`) });

export const special = (field: string) => () =>
  i18next.t('validation:special', { field: i18next.t(`common:${field}`) });

export const exists = (field: string) => () =>
  i18next.t('validation:exists', { field: i18next.t(`common:${field}`) });
