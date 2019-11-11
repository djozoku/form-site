/* eslint-disable import/no-cycle */
import { User } from './User';

export interface Group {
  id: number;
  name: string;
  owner?: User;
  members?: User[];
}
