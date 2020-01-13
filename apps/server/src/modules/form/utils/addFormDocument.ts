import { getConnection } from 'typeorm';
import SQLBricks from 'sql-bricks';
import Form from '../Form.Entity';

export const addFormDocument = async (form: Form, document: string) => {
  const parsedDocument = JSON.parse(document);
  const correctField = (key: string) => form.fields.find((field) => field.displayName === key);
  const allOk = Object.keys(parsedDocument).reduce<boolean>((acc, key, i) => {
    if (i === 0) {
      return !!correctField(key);
    }
    return acc && !!correctField(key);
  }, false);
  if (!allOk) return false;
  const correctedDocument = Object.fromEntries(
    Object.entries(parsedDocument).map(([k, v]) => [k.toLowerCase(), v])
  );
  const sql = SQLBricks.insert(`${form.name.toLowerCase()}_form`, correctedDocument).toParams();
  await getConnection().query(sql.text, sql.values);
  return true;
};
