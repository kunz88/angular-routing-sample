import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

type Theme = 'dark' | 'light';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private document = inject(DOCUMENT);

  constructor() {}

  setTheme() {
    const theme =
      this.document.documentElement.getAttribute('data-theme') === 'autumn'
        ? 'retro'
        : 'autumn';
    this.document.documentElement.setAttribute('data-theme', theme);
  }
}
