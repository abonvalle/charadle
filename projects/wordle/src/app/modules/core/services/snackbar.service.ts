import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { first, takeUntil, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private _snackBar: MatSnackBar) {}
  showUnkownNameAlert(currentGuess: string): void {
    let snackBarRef = this.openSnackBar('Prénom inconnu', 'alert', 'Signaler comme existant');
    snackBarRef
      .onAction()
      .pipe(first(), takeUntil(timer(4000)))
      .subscribe(() => {
        this.tagNameAsValid(currentGuess);
      });
  }

  openSnackBar(msg: string, type?: 'alert' | 'success', action?: string): MatSnackBarRef<TextOnlySnackBar> {
    const panelClass = ['font-bold', 'text-white'];
    type && panelClass.push(type);
    return this._snackBar.open(msg, action, {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 3500,
      panelClass
    });
  }
  tagNameAsValid(name: string) {
    console.warn('tag as valid ', name);
    this.openSnackBar('Prénom en cours de vérification, merci !');
    return;
  }
}
