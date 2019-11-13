/* eslint-disable import/no-cycle */
import { Group } from './Group';

export interface Form {
  id: number;
  name: string;
  owner?: Group;
}
