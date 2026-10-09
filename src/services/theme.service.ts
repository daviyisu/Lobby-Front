import { Injectable } from '@angular/core';

export type ThemeMode = 'system' | 'light' | 'dark';

const STORAGE_KEY = 'lobby-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private media = window.matchMedia('(prefers-color-scheme: dark)');
  mode: ThemeMode = this.readMode();

  constructor() {
    this.media.addEventListener('change', () => {
      if (this.mode === 'system') {
        this.apply();
      }
    });
    this.apply();
  }

  setMode(mode: ThemeMode): void {
    this.mode = mode;
    try {
      if (mode === 'system') {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, mode);
      }
    } catch {
      // Storage can be unavailable (private mode); the choice still applies for this session.
    }
    this.apply();
  }

  private apply(): void {
    const dark =
      this.mode === 'dark' || (this.mode === 'system' && this.media.matches);
    document.documentElement.setAttribute(
      'data-theme',
      dark ? 'dark' : 'light',
    );
  }

  private readMode(): ThemeMode {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === 'light' || saved === 'dark' ? saved : 'system';
    } catch {
      return 'system';
    }
  }
}
