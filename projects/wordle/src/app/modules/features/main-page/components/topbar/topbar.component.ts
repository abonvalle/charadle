import { Component, OnInit } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { LocalStorageService } from '@core/services/session-storage.service';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';
import { SettingsDialogComponent } from '../settings-dialog/settings.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent implements OnInit {
  constructor(public helpDialog: MatDialog, private _localStrg: LocalStorageService) {}

  ngOnInit(): void {
    if (!this._localStrg.getItem(this._localStrg.firstTime)) {
      this.openHelp();
      this._localStrg.setItem(this._localStrg.firstTime, true);
    }
  }
  openHelp() {
    this.helpDialog.open(HelpDialogComponent);
  }
  openSettings() {
    this.helpDialog.open(SettingsDialogComponent);
  }
}
