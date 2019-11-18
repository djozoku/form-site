import { getConnection, getManager } from 'typeorm';

import { FormData } from '@form/interfaces/types/FormData';

import Group from '@module/group/Group.Entity';

import Form from '../Form.Entity';

export const createForm = async (
  group: Group,
  formName: string,
  formData: FormData
): Promise<boolean> => {
  const form = new Form();
  form.name = formName;
  form.displayName = formData.displayName || formName;
  form.owner = group;
  form.fields = formData.fields;
  form.dataDisplay = formData.dataDisplay;
  const columns = formData.fields!.map((f) => `, ${f.name} ${f.databaseType}`).join('');
  await getConnection().query(
    `CREATE TABLE ${formName}_Form (ID int NOT NULL PRIMARY KEY AUTO_INCREMENT${columns});`
  );
  await getManager().save(form);
  return true;
};
