import { letterState } from './letter.model';

export const keyboardKeyBackgroundLetter: {
  [Property in letterState]: string;
} = {
  partial: 'bg-partial',
  right: 'bg-right',
  unused: 'bg-unused',
  none: 'bg-secondary'
};
