import { Injectable, signal } from '@angular/core';
import { AppSettings } from '../models/app.model';
import { APP_DEFAULTS } from '../constants/defaults';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    private optionsSignal = signal<AppSettings>(APP_DEFAULTS);

    getOptions() {
        return this.optionsSignal();
    }

    setOptions(options: Partial<AppSettings>) {
        this.optionsSignal.update((current) => ({
            ...current,
            ...options,
        }));
    }
}