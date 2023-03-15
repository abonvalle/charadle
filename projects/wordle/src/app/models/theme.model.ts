import { theme } from './theme.interface';

export class Theme {
  theme: theme;
  constructor(theme: theme) {
    this.theme = theme;
  }
  get buttonClass(): string {
    return `${this.theme.kbClass} ${this.theme.borderActive}`;
  }
}
