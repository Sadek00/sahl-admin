import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(private snackBar: MatSnackBar) {}

  handleError(error: HttpErrorResponse | Error) {
    let errorMessage = 'An error occurred';

    if (error instanceof HttpErrorResponse) {
      // Server or connection error
      errorMessage = error.error?.message || error.statusText || errorMessage;
    } else {
      // Client-side error
      errorMessage = error.message || errorMessage;
    }

    this.showError(errorMessage);
    console.error('Error:', error);
  }
  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['error-snackbar']
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
}