import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GameService } from '@core/services/game.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { XHRService } from '@core/services/xhr.service';
@Component({
  selector: 'issue-report-dialog',
  templateUrl: 'issue-report-dialog.component.html'
})
export class IssueReportDialogComponent {
  form: FormGroup = new FormGroup({});
  issue: FormControl = new FormControl('', Validators.required);
  constructor(
    private _formBuilder: FormBuilder,
    private _snackbarServ: SnackbarService,
    private _dialogRef: MatDialogRef<IssueReportDialogComponent>,
    private _gameService: GameService,
    private _XHRServ: XHRService
  ) {
    this._initForm();
  }
  private _initForm(): void {
    this.form = this._formBuilder.group({
      issue: this.issue,
      comment: new FormControl('', [Validators.maxLength(250)]),
      captcha: new FormControl<string>('', [Validators.required])
    });
    console.warn(this.form);
  }

  onVerify(token: string) {
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
  reportIssue(): void {
    if (this.form.invalid) {
      return;
    }
    // Get the form data
    let data = new FormData();
    (Object.entries(this.form.value) as Array<[string, string]>).forEach(([key, value]) =>
      data.append(key, value.toString())
    );
    try {
      data.append('boardlines', JSON.stringify(this._gameService.boardLines$.value));
    } catch (e) {
      console.error(e);
    }
    data.append('type', 'issue');

    this._XHRServ
      .reportPHP(data)
      .then(
        (_res) => {
          this._snackbarServ.issueReported();
        },
        () => {
          this._snackbarServ.defaultErrorMsg();
        }
      )
      .finally(() => this._dialogRef.close());
    console.warn(this.form.value);
  }
}
