import { letterState } from './letter.model';

export interface keyboard {
  [rowIndex: number]: key[];
}
export interface key {
  letter: string;
  state: letterState;
  classes: string;
}
