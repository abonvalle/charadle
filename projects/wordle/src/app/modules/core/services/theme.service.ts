import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { theme } from '../../../models/theme.interface';
import { Theme } from '../../../models/theme.model';
import { defaultTheme } from '../../../models/themes';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  theme$: BehaviorSubject<theme> = new BehaviorSubject(defaultTheme);
  newtheme$: BehaviorSubject<Theme> = new BehaviorSubject(new Theme(defaultTheme));
  updateTheme(theme: theme) {
    this.theme$.next(theme);
    this.newtheme$.next(new Theme(theme));
  }
}
