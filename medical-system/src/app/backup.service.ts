import { Injectable } from '@angular/core';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
  private backupUrl = 'https://medical-system.firebaseio.com/.json?auth=80b9b&print=silent';
  triggerBackup(): Observable<any> {
    return from(fetch(this.backupUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    }))
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg = error.message ? error.message : error.toString();
    console.error(errMsg);
    return throwError(errMsg);
  }
}