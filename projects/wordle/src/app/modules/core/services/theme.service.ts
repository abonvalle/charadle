import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { defaultTheme, getThemesIds, themes } from 'themes';
import { theme } from '../../../models/theme.interface';
import { APIService } from './api.service';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  themeList: theme[] = [defaultTheme, ...themes];
  selectedThemeId$: BehaviorSubject<string> = new BehaviorSubject(this._APIServ.getTheme() ?? defaultTheme.id);
  activeThemeId$: BehaviorSubject<string> = new BehaviorSubject(
    this.selectedThemeId$.value === 'random' ? this.getRandomThemeId() : this.selectedThemeId$.value
  );
  constructor(private _APIServ: APIService) {
    this._event();
  }
  ngOnDestroy(): void {
    this.activeThemeId$.unsubscribe();
    this.selectedThemeId$.unsubscribe();
  }

  updateTheme(id: string): void {
    this.selectedThemeId$.next(id);
  }
  private _event(): void {
    this.selectedThemeId$.subscribe((id) => {
      this.activeThemeId$.next(id === 'random' ? this.getRandomThemeId() : id);
      this._APIServ.setTheme(id);
    });
  }
  getRandomThemeId(): string {
    const themes = getThemesIds();
    const index = Math.floor(Math.random() * themes.length + 1);
    return themes[index] ?? defaultTheme.id;
  }
}
