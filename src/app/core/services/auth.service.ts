import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { User, UserRole } from '../models/user.model';
import { APP_CONSTANTS } from '../constants/app.constants';
import { ApiService } from './api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private refreshTokenTimeout?: any;

  constructor(private apiService: ApiService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER) || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  private startRefreshTokenTimer(expiresIn: number) {
    // Refresh token 1 minute before expiry
    const timeout = (expiresIn - 60) * 1000;
    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  }

  private stopRefreshTokenTimer() {
    if (this.refreshTokenTimeout) {
      clearTimeout(this.refreshTokenTimeout);
    }
  }

  public hasRole(role: UserRole): boolean {
    return this.currentUserValue?.roles.includes(role) || false;
  }

  public hasAnyRole(roles: UserRole[]): boolean {
    return this.currentUserValue?.roles.some(role => roles.includes(role)) || false;
  }

  public login(username: string, password: string): Observable<User> {
    return this.apiService.post<User>('auth/login', { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            this.storeAuthData(user);
            this.currentUserSubject.next(user);
            this.startRefreshTokenTimer(user.tokenExpiration || 3600);
          }
          return user;
        })
      );
  }

  private storeAuthData(user: User) {
    localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN, user.token || '');
    if (user.refreshToken) {
      localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.REFRESH_TOKEN, user.refreshToken);
    }
    if (user.tokenExpiration) {
      localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN_EXPIRATION, user.tokenExpiration.toString());
    }
  }

  public refreshToken(): Observable<User> {
    const refreshToken = localStorage.getItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.apiService.post<User>('auth/refresh-token', { refreshToken })
      .pipe(
        map(user => {
          if (user && user.token) {
            this.storeAuthData(user);
            this.currentUserSubject.next(user);
            this.startRefreshTokenTimer(user.tokenExpiration || 3600);
          }
          return user;
        }),
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  public register(username: string, email: string, password: string): Observable<User> {
    return this.apiService.post<User>('auth/register', { username, email, password });
  }

  public logout(): void {
    const refreshToken = localStorage.getItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    if (refreshToken) {
      // Attempt to invalidate the refresh token on the server
      this.apiService.post('auth/logout', { refreshToken }).subscribe();
    }
    
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN_EXPIRATION);
    this.stopRefreshTokenTimer();
    this.currentUserSubject.next(null);
    this.router.navigate(['/authentication/login']);
  }

  public updateProfile(user: Partial<User>): Observable<User> {
    return this.apiService.put<User>('auth/profile', user)
      .pipe(
        map(updatedUser => {
          const currentUser = this.currentUserValue;
          if (currentUser) {
            const newUser = { ...currentUser, ...updatedUser };
            this.storeAuthData(newUser);
            this.currentUserSubject.next(newUser);
            return newUser;
          }
          return updatedUser;
        })
      );
  }
}