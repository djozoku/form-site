/* eslint-disable no-restricted-syntax */
import { FormData } from '@form/interfaces/types/FormData';

export const parseFormData = (formData: string): FormData | false => {
  const data = JSON.parse(formData) as Partial<FormData>;
  if (!data?.fields || !Array.isArray(data.fields)) return false;
  for (const field of data.fields) {
    const { name, displayName, databaseType, inputType, options } = field;
    if (
      !name ||
      typeof name !== 'string' ||
      /[^A-Za-z_0-9]+/.test(name) ||
      /^[0-9]{1}.*/.test(name)
    )
      return false;
    if (!displayName || typeof displayName !== 'string') return false;
    if (
      !databaseType ||
      typeof databaseType !== 'string' ||
      (databaseType !== 'text' &&
        databaseType !== 'int' &&
        databaseType !== 'real' &&
        databaseType !== 'bool')
    )
      return false;
    if (
      !inputType ||
      typeof inputType !== 'string' ||
      (inputType !== 'checkbox' &&
        inputType !== 'radio' &&
        inputType !== 'select' &&
        inputType !== 'text' &&
        inputType !== 'number')
    )
      return false;
    if ((inputType === 'radio' || inputType === 'select') && (!options || !Array.isArray(options)))
      return false;
  }
  if (!data?.dataDisplay || !Array.isArray(data.dataDisplay)) return false;
  for (const dataDisplay of data.dataDisplay) {
    const { name, displayName, display } = dataDisplay;
    if (
      !name ||
      typeof name !== 'string' ||
      /[^A-Za-z_0-9]+/.test(name) ||
      /^[0-9]{1}.*/.test(name)
    )
      return false;
    if (!displayName || typeof displayName !== 'string') return false;
    if (!display || !Array.isArray(display) || display.length < 2) return false;
    // FIXME: should check that display has same data as fields
  }
  return data as FormData;
};
