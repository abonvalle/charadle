import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APIService } from '@core/services/api.service';
import { SettingsService } from '@core/services/settings.service';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html',
    standalone: false
})
export class SettingsDialogComponent {
  form: FormGroup;
  constructor(public settingsServ: SettingsService, private _apiServ: APIService) {
    this.form = new FormGroup({});
    this._init();
  }
  private _init(): void {
    // this.form.addControl('playerName', new FormControl(this.settingsServ.playerName$?.value));
    this.form.addControl('colorBlindMode', new FormControl(this.settingsServ.colorBlindMode$?.value));
    this.form.addControl('hideKeyboard', new FormControl(this.settingsServ.hideKeyboard$?.value));
  }

  save(): void {
    console.warn(this.form.value);
    this.settingsServ.saveStorageSettings(this.form.value);
  }
  deleteAllData(): void {
    this._apiServ.deleteAll();
    this.resetForm();
    window.location = window.location;
  }
  resetForm(): void {
    this.form.get('colorBlindMode')?.setValue('');
    this.form.get('hideKeyboard')?.setValue('');
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
