import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { APIService } from '@core/services/api.service';
import { SettingsService } from '@core/services/settings.service';

@Component({
  selector: 'name-input-dialog',
  templateUrl: 'name-input-dialog.component.html'
})
export class NameInputDialogComponent {
  form: FormGroup;
  constructor(public settingsServ: SettingsService, private _apiServ: APIService) {
    this.form = new FormGroup({});
    this._init();
  }
  private _init(): void {
    this.form.addControl('playerName', new FormControl(this.settingsServ.playerName$?.value));
  }
  save(): void {
    console.warn(this.form.value);
    this.settingsServ.saveStorageSettings(this.form.value);
  }
  deleteAllData(): void {
    this._apiServ.deleteAll();
    this.resetForm();
  }
  resetForm(): void {
    this.form.get('playerName')?.setValue('');
    this.form.markAsPristine();
    this.form.markAsUntouched();
  }
}
