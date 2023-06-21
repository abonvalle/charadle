import { Injectable } from '@angular/core';
import themes from '@editor-assets-series/jsons/themes.json';
import { theme } from '@models/theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  themeList: theme[] = themes.themes;
  defaultTheme: theme | undefined = this.themeList.find((t) => t.default);
  constructor() {}
}
