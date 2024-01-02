import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EnvironmentService } from '@core/services/environment.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { XHRService } from '@core/services/xhr.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'name-report-dialog',
  templateUrl: 'name-report-dialog.component.html'
})
export class NameReportDialogComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  assetsPaths$ = new BehaviorSubject('');
  private _destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    private _formBuilder: FormBuilder,
    private _snackbarServ: SnackbarService,
    private _dialogRef: MatDialogRef<NameReportDialogComponent>,
    private _XHRServ: XHRService,
    private _envServ: EnvironmentService
  ) {}
  ngOnInit(): void {
    this._initForm();
    this._envServ.version$.pipe(takeUntil(this._destroy$)).subscribe((version) => {
      this.assetsPaths$.next(`assets/${version.code}/gifs/suspicious.gif`);
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
  }
  private _initForm(): void {
    this.form = this._formBuilder.group({
      name: new FormControl(this.data.name, [Validators.required, Validators.maxLength(15)]),
      captcha: new FormControl<string>('', [Validators.required])
    });
    console.warn(this.form);
  }

  onVerify(token: any) {
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
