import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageService } from '@core/services/local-storage.service';
import { ThemeService } from '@core/services/theme.service';
import { theme, themes } from '@models/*';
import { Subject } from 'rxjs';
import { HelpDialogComponent } from '../../../features/main-page/components/help-dialog/help-dialog.component';
import { SettingsDialogComponent } from '../../../features/main-page/components/settings-dialog/settings.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<void>;
  colorsList: theme[] = themes;

  constructor(public themeService: ThemeService, private _dialog: MatDialog, private _localStrg: LocalStorageService) {
    this.destroy$ = new Subject();
  }

  ngOnInit(): void {
    if (!this._localStrg.OLDgetItem(this._localStrg.firstTime)) {
      this.openHelp();
      // const dialog = this.openHelp();
      this._localStrg.OLDsetItem(this._localStrg.firstTime, true);
      // if (!this._settingsServ.playerName$?.value) {
      //   dialog
      //     .afterClosed()
      //     .pipe(takeUntil(this.destroy$))
      //     .subscribe(() => this._dialog.open(NameInputDialogComponent));
      // }
    } else {
      // if (!this._settingsServ.playerName$?.value) {
      //   this._dialog.open(NameInputDialogComponent, { disableClose: true });
      // }
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
    return this.themeService.theme$.value.name === color.name;
  }
}
