import { keyboardKeyBackground } from './keyboard-key-background-letter';

export interface keyboard {
  [rowIndex: number]: key[];
}
export interface key {
  letter: string;
  state: keyboardKeyBackground;
  classes: string;
}
