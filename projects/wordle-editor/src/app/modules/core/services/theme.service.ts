import { Injectable, OnDestroy } from '@angular/core';
import { APIService } from '@core/services/api.service';
import { GameService } from '@core/services/game.service';
import { theme } from '@models/theme.interface';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AssetsService } from './assets.service';

@Injectable({ providedIn: 'root' })
export class ThemeService implements OnDestroy {
  private _destroy$: Subject<void> = new Subject();
  get themeList$(): BehaviorSubject<theme[]> {
    return this._assetsServ.themes$;
  }

  defaultTheme$: BehaviorSubject<theme>;

  /**@description User selected theme (can be "random") */
  selectedThemeId$: BehaviorSubject<string>;

  /**@description Current active theme (Random theme if user selected "random") */
  activeTheme$: BehaviorSubject<theme>;

  constructor(
    private _APIServ: APIService,
    private _assetsServ: AssetsService,
    private _gameServ: GameService
  ) {
    const defaultTh = this.themeList$.value.find((t) => t.default);
    if (!defaultTh) {
      throw new TypeError('themeList should be instanciated and it should contain at least one default theme');
    }
    this.defaultTheme$ = new BehaviorSubject(defaultTh);
    const selectedTh = this._APIServ.getTheme() ?? defaultTh.id;
    this.selectedThemeId$ = new BehaviorSubject(selectedTh);
    this.activeTheme$ = new BehaviorSubject(
      this.selectedThemeId$.value === 'random'
        ? this.getRandomTheme()
        : this.themeList$.value.find((t) => t.id === selectedTh) ?? defaultTh
    );

    this._event();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this.activeTheme$.unsubscribe();
    this.selectedThemeId$.unsubscribe();
    this._destroy$.unsubscribe();
  }

  updateTheme(id: string): void {
    this.selectedThemeId$.next(id);
  }
  private _event(): void {
    this.selectedThemeId$.subscribe((id) => {
      const activeTheme = id === 'random' ? this.getRandomTheme() : this.themeList$.value.find((t) => t.id === id);
      if (!activeTheme) {
        throw new TypeError('themeList should be instanciated and it should contain the selected theme');
      }
      this.activeTheme$.next(activeTheme);
      this._APIServ.setTheme(id);
    });
    this._assetsServ.themes$.pipe(takeUntil(this._destroy$)).subscribe((themeList) => {
      const defaultTh = themeList.find((t) => t.default);
      if (!defaultTh) {
        throw new TypeError('themeList should be instanciated and it should contain at least one default theme');
      }
      this.defaultTheme$.next(defaultTh);
      const selectedTh = this._APIServ.getTheme() ?? defaultTh.id;
      this.selectedThemeId$.next(selectedTh);
      this.activeTheme$.next(
        this.selectedThemeId$.value === 'random'
          ? this.getRandomTheme()
          : themeList.find((t) => t.id === selectedTh) ?? defaultTh
      );
    });
  }
  getRandomTheme(): theme {
    const index = Math.floor(Math.random() * this.themeList$.value.length + 1);
    return this.themeList$.value[index] ?? this.defaultTheme$.value;
  }
  get specialClasses(): string {
    if (!this._gameServ.success$.value) {
      return '';
    }
    if (['gojo', 'panda', 'toge'].includes(this._gameServ.wordle$.value.text)) {
      return this._gameServ.wordle$.value.text;
    }
    if ([''].includes(this._gameServ.wordle$.value.serie)) {
      return this._gameServ.wordle$.value.text;
    }
    return '';
  }
}
