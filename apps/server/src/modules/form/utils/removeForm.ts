import { getConnection } from 'typeorm';

export const removeForm = async (name: string) => {
  await getConnection().query(`DROP TABLE ${name}_Form;`);
};
