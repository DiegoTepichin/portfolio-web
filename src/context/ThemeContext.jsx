import { createContext, useEffect, useContext } from 'react';

export const ThemeContext = createContext();

/**
 * ThemeProvider — Dark mode only.
 * The portfolio uses a single dark visual identity.
 * The 'dark' class is applied permanently to <html> on mount.
 */
export function ThemeProvider({ children }) {
  useEffect(() => {
    // Force dark mode permanently — no user toggle
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: 'dark', toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
}
