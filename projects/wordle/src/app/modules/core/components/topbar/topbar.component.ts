import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '@core/services/settings.service';
import { ThemeService } from '@core/services/theme.service';
import { theme } from '@models/*';
import { Subject, takeUntil } from 'rxjs';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopbarComponent implements OnInit, OnDestroy {
  _destroy$: Subject<void> = new Subject();
  themeList = this._themeServ.themeList;
  currentThemeId$ = this._themeServ.selectedThemeId$;

  constructor(
    private _dialog: MatDialog,
    private _settingsServ: SettingsService,
    private _themeServ: ThemeService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this._settingsServ.firstTime$.value) {
      this.openHelp();
      this._settingsServ.setFirstTime(false);
    }
    this.currentThemeId$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      this._cdr.detectChanges();
    });
  }
  ngOnDestroy(): void {
    this._destroy$?.next();
    this._destroy$?.unsubscribe();
  }
  openHelp(): void {
    this._dialog.open(HelpDialogComponent);
  }
  openSettings(): void {
    this._dialog.open(SettingsDialogComponent);
  }
  changeTheme(id: string): void {
    this._themeServ.updateTheme(id);
  }
  isCurrentTheme(id: string): boolean {
    return this.currentThemeId$.value === id;
  }
  trackByFn(_index: number, item: theme) {
    return item.id;
  }
}
