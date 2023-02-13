import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpDialogComponent } from '../help-dialog/help-dialog.component';

@Component({
  selector: 'topbar',
  templateUrl: 'topbar.component.html'
})
export class TopbarComponent {
  constructor(public helpDialog: MatDialog) {}

  openHelp() {
    const dialogRef = this.helpDialog.open(HelpDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
