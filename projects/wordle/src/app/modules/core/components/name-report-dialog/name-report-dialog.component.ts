import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '@core/services/snackbar.service';
import { XHRService } from '@core/services/xhr.service';
@Component({
  selector: 'name-report-dialog',
  templateUrl: 'name-report-dialog.component.html'
})
export class NameReportDialogComponent {
  form: FormGroup = new FormGroup({});
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private _formBuilder: FormBuilder,
    private _snackbarServ: SnackbarService,
    private _dialogRef: MatDialogRef<NameReportDialogComponent>,
    private _XHRServ: XHRService
  ) {
    this._initForm();
  }
  private _initForm(): void {
    this.form = this._formBuilder.group({
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(15)]),
      captcha: new FormControl<string>('', [Validators.required])
    });
    console.warn(this.form);
  }

  onVerify(token: Event) {
    // The verification process was successful.
    // You can verify the token on your server now.
    this.form.get('captcha')?.setValue(token);
  }

  onExpired() {
    this.form.get('captcha')?.setValue('');
    // The verification expired.
  }

  onError() {
    this.form.get('captcha')?.setValue('');
    // An error occured during the verification process.
  }
  reportName(): void {
    if (this.form.invalid) {
      return;
    }
    // Get the form data
    let data = new FormData();
    (Object.entries(this.form.value) as Array<[string, string]>).forEach(([key, value]) =>
      data.append(key, value.toString())
    );
    data.append('type', 'name');

    this._XHRServ
      .reportPHP(data)
      .then(
        (_res) => {
          this._snackbarServ.nameReported();
        },
        () => {
          this._snackbarServ.defaultErrorMsg();
        }
      )
      .finally(() => this._dialogRef.close());
    console.warn(this.form.value);
  }
}
