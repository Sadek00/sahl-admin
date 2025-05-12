import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiResponse, ApiError } from '../models/api.model';
import { environment } from 'src/environments/environment';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorService: ErrorService
  ) {}

  private handleResponse<T>(response: ApiResponse<T>): T {
    if (!response.success) {
      this.errorService.showError(response.message || 'Operation failed');
      throw new Error(response.message || 'Operation failed');
    }
    return response.data;
  }

  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<ApiResponse<T>>(this.baseUrl + endpoint, { params }).pipe(
      map(response => this.handleResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<ApiResponse<T>>(this.baseUrl + endpoint, body).pipe(
      map(response => this.handleResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<ApiResponse<T>>(this.baseUrl + endpoint, body).pipe(
      map(response => this.handleResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<ApiResponse<T>>(this.baseUrl + endpoint).pipe(
      map(response => this.handleResponse(response)),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    const apiError: ApiError = {
      message: error.error?.message || error.message,
      status: error.status,
      code: error.error?.code,
      errors: error.error?.errors,
    };
    this.errorService.handleError(error);
    return throwError(() => apiError);
  }
}
