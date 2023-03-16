import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingsService } from '@core/services/settings.service';
import { ThemeService } from '@core/services/theme.service';
import { theme, themes } from '@models/*';
import { Subject } from 'rxjs';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<void>;
  colorsList: theme[] = themes;

  constructor(public themeService: ThemeService, private _dialog: MatDialog, private _settingsServ: SettingsService) {
    this.destroy$ = new Subject();
  }

  ngOnInit(): void {
    if (this._settingsServ.firstTime$.value) {
      this.openHelp();
      this._settingsServ.setFirstTime(false);
    }
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  openHelp(): void {
    this._dialog.open(HelpDialogComponent);
  }
  openSettings(): void {
    this._dialog.open(SettingsDialogComponent);
  }
  changeColor(color: theme): void {
    this.themeService.updateTheme(color);
  }
  isCurrentColor(color: theme): boolean {
    return this.themeService.theme$.value.id === color.id;
  }
  trackByFn(_index: number, item: theme) {
    return item.id;
  }
}
