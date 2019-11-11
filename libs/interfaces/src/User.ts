/* eslint-disable import/no-cycle */
import { Group } from './Group';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  ownedGroups: Group[];
  groups: Group[];
}
