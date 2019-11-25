import { getConnection, getManager } from 'typeorm';

import { FormData } from '@form/interfaces/types/FormData';

import Group from '@module/group/Group.Entity';

import Form from '../Form.Entity';

export const createForm = async (
  group: Group,
  formName: string,
  formData: FormData
): Promise<boolean> => {
  const form = Form.create({
    name: formName,
    displayName: formData.displayName || formName,
    owner: group,
    fields: formData.fields,
    dataDisplay: formData.dataDisplay
  });
  const columns = formData.fields!.map((f) => `, ${f.name} ${f.databaseType}`).join('');
  await getConnection().query(`CREATE TABLE ${formName}_Form (ID SERIAL PRIMARY KEY ${columns});`);
  await getManager().save(form);
  return true;
};
