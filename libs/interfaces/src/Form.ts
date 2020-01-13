/* eslint-disable import/no-cycle */
import { Group } from './Group';
import { FormField, FormDataDisplay } from './FormData';

export interface Form {
  id: number;
  name: string;
  displayName: string;
  owner?: Group;
  fields: FormField[];
  dataDisplay: FormDataDisplay[];
}
