import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@config/environment';
import { ThemeService } from '@core/services/theme.service';
import { theme } from '@models/*';
import { Subject, takeUntil } from 'rxjs';
import { ChangeWordleDialogComponent } from '../change-wordle-dialog/change-wordle-dialog.component';
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
  version: string = environment.version.label;

  constructor(private _dialog: MatDialog, private _themeServ: ThemeService, private _cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
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
  changeVersion(): void {
    this._dialog.open(ChangeWordleDialogComponent);
  }
  isCurrentTheme(id: string): boolean {
    return this.currentThemeId$.value === id;
  }
  trackByFn(_index: number, item: theme) {
    return item.id;
  }
}
