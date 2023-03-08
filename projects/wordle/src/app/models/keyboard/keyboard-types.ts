import { keyboardAzerty } from './keyboard-azerty';
import { keyboardQwerty } from './keyboard-qwerty';
export type keyboardType = keyof typeof keyboardTypes;
export const keyboardTypes = {
  AZERTY: keyboardAzerty,
  QWERTY: keyboardQwerty
};
