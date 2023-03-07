import { keyboardKeyBackground } from './keyboard-key-background-letter';

export interface keyboard {
  [rowIndex: number]: { letter: string; state: keyboardKeyBackground; classes: string }[];
}
