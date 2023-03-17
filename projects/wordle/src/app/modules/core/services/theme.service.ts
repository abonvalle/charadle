import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultTheme, themes } from 'themes';
import { theme } from '../../../models/theme.interface';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  themeList: theme[] = [defaultTheme, ...themes];
  activeThemeId$: BehaviorSubject<string> = new BehaviorSubject('');
  constructor() {}
  ngOnDestroy(): void {
    this.activeThemeId$.unsubscribe();
  }
  // theme$: BehaviorSubject<theme> = new BehaviorSubject(defaultTheme);
  // newtheme$: BehaviorSubject<Theme> = new BehaviorSubject(new Theme(defaultTheme));
  // updateTheme(theme: theme) {
  //   this.theme$.next(theme);
  //   this.newtheme$.next(new Theme(theme));
  // }
  updateTheme(id: string) {
    this.activeThemeId$.next(id);
  }
}
