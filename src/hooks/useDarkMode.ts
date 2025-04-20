import {useState, useEffect, useCallback} from 'react';
import {getThemeFromStorage, saveThemeToStorage} from '../utils';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = getThemeFromStorage();

    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      const html = document.documentElement;

      if (newMode) {
        html.classList.add('dark');
        saveThemeToStorage('dark');
      } else {
        html.classList.remove('dark');
        saveThemeToStorage('light');
      }
      return newMode;
    });
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [isDarkMode]);

  return {isDarkMode, toggleDarkMode};
};

export default useDarkMode;
