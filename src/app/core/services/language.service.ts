import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = new BehaviorSubject<string>(APP_CONSTANTS.DEFAULT_LANGUAGE);

  constructor(private translate: TranslateService) {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLang = localStorage.getItem('language') || APP_CONSTANTS.DEFAULT_LANGUAGE;
    this.translate.setDefaultLang(APP_CONSTANTS.DEFAULT_LANGUAGE);
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    if (APP_CONSTANTS.SUPPORTED_LANGUAGES.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem('language', lang);
      this.currentLang.next(lang);
    }
  }

  getCurrentLang(): Observable<string> {
    return this.currentLang.asObservable();
  }

  getSupportedLanguages(): string[] {
    return APP_CONSTANTS.SUPPORTED_LANGUAGES;
  }
}