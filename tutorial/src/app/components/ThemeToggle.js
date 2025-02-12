import { Switch, FormControlLabel } from '@mui/material';
import { useThemeContext } from '../context/ThemeContext';

function ThemeToggle() {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <FormControlLabel
      control={<Switch checked={themeMode === 'dark'} onChange={toggleTheme} />}
      label="Dark Mode"
    />
  );
}

export default ThemeToggle;
