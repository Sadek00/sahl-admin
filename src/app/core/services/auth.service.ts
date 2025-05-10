import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { APP_CONSTANTS } from '../constants/app.constants';
import { ApiResponse } from '../models/api.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(
      JSON.parse(localStorage.getItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER) || 'null')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${environment.apiUrl}/auth/login`, { username, password })
      .pipe(map(response => {
        const user = response.data;
        if (user && user.token) {
          localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
          localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN, user.token);
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  register(username: string, email: string, password: string): Observable<User> {
    return this.http.post<ApiResponse<User>>(`${environment.apiUrl}/auth/register`, { 
      username, 
      email, 
      password 
    }).pipe(map(response => response.data));
  }

  logout(): void {
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.TOKEN);
    this.currentUserSubject.next(null);
  }

  updateProfile(user: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${environment.apiUrl}/auth/profile`, user)
      .pipe(map(response => {
        const updatedUser = response.data;
        const currentUser = this.currentUserValue;
        if (currentUser) {
          const newUser = { ...currentUser, ...updatedUser };
          localStorage.setItem(APP_CONSTANTS.AUTH_STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
          this.currentUserSubject.next(newUser);
        }
        return updatedUser;
      }));
  }
}