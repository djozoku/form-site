/* eslint-disable import/no-cycle */
import { User } from './User';
import { Form } from './Form';

export interface Group {
  id: number;
  name: string;
  owner?: User;
  members?: User[];
  forms?: Form[];
}
