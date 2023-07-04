import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { theme } from '../../../models/theme.interface';
import { APIService } from './api.service';
import { AssetsService } from './assets.service';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  get themeList(): theme[] {
    const themeList = this._assetsServ.themes.themes;
  if(!themeList){throw new TypeError('themeList should be instanciated');}
  return themeList
}

 get defaultTheme():theme{
  const defaultTheme = this.themeList.find((t) => t.default)
  if(!defaultTheme){throw new TypeError('theme should be instanciated');}
  return defaultTheme
}
  selectedThemeId$: BehaviorSubject<string> = new BehaviorSubject(
    this._APIServ.getTheme() ?? this.defaultTheme.id ?? ''
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
    return this.themeList[index]?.id ?? this.defaultTheme.id ?? '';
  }

}
