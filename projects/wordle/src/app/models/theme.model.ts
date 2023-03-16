import { theme } from './theme.interface';

export class Theme {
  theme: theme;
  constructor(theme: theme) {
    this.theme = theme;
  }
  get buttonClass(): string {
    return `${this.theme.kbClass} ${this.theme.borderActive}`;
  }
  get boardBox(): string {
    return `${this.theme.border} ${this.theme.boardLetterBg}`;
  }
  get activeBoardBox(): string {
    return `${this.theme.borderActive} ${this.theme.boardLetterBg}`;
  }
  get feedbackLetter(): string {
    return `${this.theme.borderActive} ${this.theme.boardLetterBg}`;
  }
}
