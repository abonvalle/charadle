import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '@core/services/local-storage.service';
import { SettingsService } from '@core/services/settings.service';
import { Subject, takeUntil } from 'rxjs';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { NameInputDialogComponent } from '../name-input/name-input-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent implements OnInit, OnDestroy {
  destroy$: Subject<void>;

  constructor(
    private _dialog: MatDialog,
    private _localStrg: LocalStorageService,
    private _settingsServ: SettingsService
  ) {
    this.destroy$ = new Subject();
  }

  ngOnInit(): void {
    if (!this._localStrg.getItem(this._localStrg.firstTime)) {
      const dialog = this.openHelp();
      this._localStrg.setItem(this._localStrg.firstTime, true);
      if (!this._settingsServ.playerName$?.value) {
        dialog
          .afterClosed()
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => this._dialog.open(NameInputDialogComponent));
      }
    } else {
      if (!this._settingsServ.playerName$?.value) {
        this._dialog.open(NameInputDialogComponent, { disableClose: true });
      }
    }
  }
  ngOnDestroy(): void {
    this.destroy$?.next();
    this.destroy$?.unsubscribe();
  }
  openHelp(): MatDialogRef<HelpDialogComponent> {
    return this._dialog.open(HelpDialogComponent);
  }
  openSettings() {
    this._dialog.open(SettingsDialogComponent);
  }
}
