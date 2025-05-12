import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { APP_CONSTANTS } from '../constants/app.constants';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private apiService: ApiService) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER) || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  login(username: string, password: string): Observable<User> {
    return this.apiService.post<User>('auth/login', { username, password })
      .pipe(
        map(user => {
          if (user && user.token) {
            localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
            localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN, user.token);
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }
  register(username: string, email: string, password: string): Observable<User> {
    return this.apiService.post<User>('auth/register', { username, email, password });
  }

  logout(): void {
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN);
    this.currentUserSubject.next(null);
  }
  updateProfile(user: Partial<User>): Observable<User> {
    return this.apiService.put<User>('auth/profile', user)
      .pipe(
        map(updatedUser => {
          const currentUser = this.currentUserValue;
          if (currentUser) {
            const newUser = { ...currentUser, ...updatedUser };
            localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
            this.currentUserSubject.next(newUser);
            return newUser;
          }
          return updatedUser;
        })
      );
  }
}