import { Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({ providedIn: 'root' })
export class XHRService {
  constructor(private _snackbarServ: SnackbarService) {}
  reportPHP(data: { [key: string]: string }): Promise<unknown> {
    return new Promise((resolve, reject) => {
      // Make the AJAX request
      const xhr = new XMLHttpRequest();
      console.warn('xhr send', xhr);
      xhr.open('POST', 'https://nodemailerezug4luh-nameguessr-mailer.functions.fnc.fr-par.scw.cloud', true);

      // Set the Referer header
      // xhr.setRequestHeader('Referer', '');

      xhr.onload = () => {
        if (xhr.status == 200) {
          // Get the response from the server
          const result = JSON.parse(xhr.responseText);
          console.warn('xhr', result);
          resolve(result);
        } else {
          this._snackbarServ.defaultErrorMsg();
          reject();
        }
      };
      xhr.send(JSON.stringify(data));
    });
  }
}
