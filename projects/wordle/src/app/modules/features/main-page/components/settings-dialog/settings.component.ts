import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LocalStorageService } from '@core/services/local-storage.service';
import { SettingsService } from '@core/services/settings.service';

@Component({
  selector: 'settings',
  templateUrl: 'settings.component.html'
})
export class SettingsDialogComponent {
  form: FormGroup;
  constructor(public settingsServ: SettingsService, private _localStrgServ: LocalStorageService) {
    this.form = new FormGroup({});
    this._init();
  }
  private _init(): void {
    this.form.addControl('playerName', new FormControl(this.settingsServ.playerName$?.value));
    this.form.addControl('colorBlindMode', new FormControl(this.settingsServ.colorBlindMode$?.value));
  }

  save(): void {
    console.warn(this.form.value);
    this.settingsServ.saveStorageSettings(this.form.value);
  }
  deleteAllData(): void {
    this._localStrgServ.clear();
    this.resetForm();
  }
  resetForm(): void {
    this.form.get('playerName')?.setValue('');
    this.form.get('colorBlindMode')?.setValue('');
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
