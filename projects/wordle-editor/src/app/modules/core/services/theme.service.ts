import { Injectable, OnDestroy } from '@angular/core';
import themes from '@assets-series/jsons/themes.json';
import { BehaviorSubject } from 'rxjs';
import { theme } from '../../../models/theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  themeList: theme[] = themes.themes;
  defaultTheme: theme | undefined = this.themeList.find((t) => t.default);
  selectedThemeId$: BehaviorSubject<string> = new BehaviorSubject(this.defaultTheme?.id ?? '');
  constructor() {}
  ngOnDestroy(): void {
    this.selectedThemeId$.unsubscribe();
  }
}
