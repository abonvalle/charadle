export class Letter {
  letter: string;
  row: number;
  order: number;
  state: letterState;

  constructor(letter: string, row: number, order: number) {
    this.letter = letter;
    this.row = row;
    this.order = order;
    this.state = '';
  }
}
export type letterState = 'partial' | 'right' | 'unused' | '';
