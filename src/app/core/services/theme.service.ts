import { Injectable } from '@angular/core';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentTheme: string = localStorage.getItem('theme') || APP_CONSTANTS.THEMES.LIGHT;

  constructor() {
    this.setTheme(this.currentTheme);
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === APP_CONSTANTS.THEMES.LIGHT 
      ? APP_CONSTANTS.THEMES.DARK 
      : APP_CONSTANTS.THEMES.LIGHT;
    this.setTheme(this.currentTheme);
  }

  private setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    //document.documentElement.className = theme + '-theme';
    
    const html = document.documentElement;
    html.classList.remove('light-theme', 'dark-theme');
    html.classList.add(`${theme}-theme`);
  }

  isDarkTheme(): boolean {
    return this.currentTheme === APP_CONSTANTS.THEMES.DARK;
  }
}