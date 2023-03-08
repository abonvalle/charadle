export class Letter {
  letter: string;
  row: number;
  order: number;
  state: letterState;
  special: boolean;

  constructor(letter: string, row: number, order: number, special?: boolean) {
    this.letter = letter;
    this.row = row;
    this.order = order;
    this.special = special ?? false;
    this.state = '';
  }
}
export type letterState = 'partial' | 'right' | 'unused' | '';
