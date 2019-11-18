import { getConnection } from 'typeorm';
import SQLBricks from 'sql-bricks';
import Form from '../Form.Entity';

export const addFormDocument = async (form: Form, document: string) => {
  const parsedDocument = JSON.parse(document);
  let allOk = false;
  Object.keys(parsedDocument).forEach((key) => {
    allOk = allOk ? !!form.fields.find((field) => field.name === key) : false;
  });
  if (!allOk) return false;
  const sql = SQLBricks.insert(`${form.name}_Form`, parsedDocument).toParams();
  await getConnection().query(sql.text, sql.values);
  return true;
};
