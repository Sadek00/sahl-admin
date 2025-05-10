import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = localStorage.getItem('theme') || 'light';

  constructor() {
    this.setTheme(this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(this.currentTheme);
  }

  private setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    document.documentElement.className = theme + '-theme';
  }

  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }
}