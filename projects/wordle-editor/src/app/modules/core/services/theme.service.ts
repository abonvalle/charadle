import { Injectable } from '@angular/core';
import { theme } from '@models/theme.interface';
import { AssetsService } from './assets.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  themeList: theme[] = this._assetsServ.themes.themes;
  defaultTheme: theme | undefined = this.themeList.find((t) => t.default);
  constructor(private _assetsServ: AssetsService) {}
}
