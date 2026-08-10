import { useEffect, useMemo, useState } from 'react';
import { STORAGE_KEYS } from '../constants/storageKeys.js';
import { getStorageItem, setStorageItem } from '../utils/localStorage.js';
import { ThemeContext, THEME_VALUES } from './themeContextValue.js';

function getInitialTheme() {
  const storedTheme = getStorageItem(STORAGE_KEYS.theme);

  if (storedTheme === THEME_VALUES.light || storedTheme === THEME_VALUES.dark) {
    return storedTheme;
  }

  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return THEME_VALUES.dark;
  }

  return THEME_VALUES.light;
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);
  const isDarkMode = theme === THEME_VALUES.dark;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    setStorageItem(STORAGE_KEYS.theme, theme);
  }, [isDarkMode, theme]);

  const value = useMemo(
    () => ({
      isDarkMode,
      setTheme,
      theme,
      toggleTheme: () =>
        setTheme((currentTheme) =>
          currentTheme === THEME_VALUES.dark
            ? THEME_VALUES.light
            : THEME_VALUES.dark,
        ),
    }),
    [isDarkMode, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
