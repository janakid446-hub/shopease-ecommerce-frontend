import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme.js';
import { IconButton } from './IconButton.jsx';

export function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  const label = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <IconButton label={label} onClick={toggleTheme}>
      {isDarkMode ? (
        <Sun aria-hidden="true" className="h-5 w-5" />
      ) : (
        <Moon aria-hidden="true" className="h-5 w-5" />
      )}
    </IconButton>
  );
}
