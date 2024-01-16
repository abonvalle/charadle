import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EnvironmentService } from '@core/services/environment.service';
import { GameService } from '@core/services/game.service';
import { SnackbarService } from '@core/services/snackbar.service';
import { XHRService } from '@core/services/xhr.service';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'issue-report-dialog',
  templateUrl: 'issue-report-dialog.component.html'
})
export class IssueReportDialogComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  issue: FormControl = new FormControl('', Validators.required);
  assetsPaths$ = new BehaviorSubject('');
  private _destroy$ = new Subject<void>();
  constructor(
    private _formBuilder: FormBuilder,
    private _snackbarServ: SnackbarService,
    private _dialogRef: MatDialogRef<IssueReportDialogComponent>,
    private _gameService: GameService,
    private _XHRServ: XHRService,
    private _envServ: EnvironmentService
  ) {}
  ngOnInit(): void {
    this._initForm();
    this._envServ.version$.pipe(takeUntil(this._destroy$)).subscribe((version) => {
      this.assetsPaths$.next(`assets/${version.code}/gifs/batsignal.gif`);
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.unsubscribe();
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
    let data = {};
    (Object.entries(this.form.value) as Array<[string, string]>).forEach(([key, value]) =>
      Object.assign(data, {
        [key]: value.toString()
      })
    );
    try {
      Object.assign(data, {
        boardlines: JSON.stringify(this._gameService.boardLines$.value)
      });
    } catch (e) {
      console.error(e);
    }
    Object.assign(data, {
      type: 'issue',
      version: this._envServ.version$.value.code
    });

    this._XHRServ.reportPHP(data).then(
      (_res) => {
        this._snackbarServ.issueReported();
      },
      () => {
        this._snackbarServ.defaultErrorMsg();
      }
    );
    this._snackbarServ.openSnackBar("Rapport en cours d'envoi 📨");
    this._dialogRef.close();
    console.warn(this.form.value);
  }
}
