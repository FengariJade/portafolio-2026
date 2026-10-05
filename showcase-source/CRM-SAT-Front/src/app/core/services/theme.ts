import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  setColor(variable: string, value: string) {
    document.documentElement.style.setProperty(variable, value);
  }

  getColor(variable: string): string {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(variable)
      .trim();
  }

  setTheme(colors: Record<string, string>) {
    Object.entries(colors).forEach(([key, value]) => {
      this.setColor(key, value);
    });
  }
  
  //Modo oscuro.
  
  private storageKey = 'sat-theme';

  setDarkMode(enabled: boolean) {
    const root = document.documentElement;

    if (enabled) {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(this.storageKey, 'dark');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem(this.storageKey, 'light');
    }
  }

  initTheme() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

}
