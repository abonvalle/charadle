import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlatformService } from '@core/services/platform.service';
import { SettingsService } from '@core/services/settings.service';
import { ThemeService } from '@core/services/theme.service';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';

@Component({
  selector: 'layout',
  templateUrl: 'layout.component.html'
})
export class LayoutComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  themeId$ = this.themeService.activeThemeId$.pipe(takeUntil(this._destroy$));
  accessibility$ = this._settingsServ.colorBlindMode$.pipe(
    takeUntil(this._destroy$),
    map((cb) => (cb ? 'accessibility' : ''))
  );
  classes$ = combineLatest([this.themeId$, this.accessibility$]).pipe(
    takeUntil(this._destroy$),
    map(([value1, value2]) => value1 + ' ' + value2)
  );

  constructor(
    public platformService: PlatformService,
    public themeService: ThemeService,
    private _settingsServ: SettingsService
  ) {}
  ngOnInit(): void {
    this._settingsServ.initSettings();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
}
