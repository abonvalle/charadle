import { Component, OnDestroy, OnInit } from '@angular/core';
import { PlatformService } from '@core/services/platform.service';
import { SettingsService } from '@core/services/settings.service';
import { ThemeService } from '@core/services/theme.service';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';
import { NgClass, AsyncPipe } from '@angular/common';
import { TopbarComponent } from '../topbar/topbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'layout',
    templateUrl: 'layout.component.html',
    imports: [NgClass, TopbarComponent, RouterOutlet, AsyncPipe]
})
export class LayoutComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  themeId$ = this.themeService.activeTheme$.pipe(
    takeUntil(this._destroy$),
    map((th) => th.id)
  );
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
