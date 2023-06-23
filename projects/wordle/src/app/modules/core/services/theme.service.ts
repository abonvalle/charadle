import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { theme } from '../../../models/theme.interface';
import { APIService } from './api.service';
import { AssetsService } from './assets.service';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  themeList: theme[] = this._assetsServ.themes.themes;
  defaultTheme: theme | undefined = this.themeList.find((t) => t.default);
  selectedThemeId$: BehaviorSubject<string> = new BehaviorSubject(
    this._APIServ.getTheme() ?? this.defaultTheme?.id ?? ''
  );
  activeThemeId$: BehaviorSubject<string> = new BehaviorSubject(
    this.selectedThemeId$.value === 'random' ? this.getRandomThemeId() : this.selectedThemeId$.value
  );
  constructor(private _APIServ: APIService, private _assetsServ: AssetsService) {
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
    const index = Math.floor(Math.random() * this.themeList.length + 1);
    return this.themeList[index]?.id ?? this.defaultTheme?.id ?? '';
  }
}
