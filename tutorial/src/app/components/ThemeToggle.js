import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useThemeContext } from "../context/ThemeContext";

function ThemeToggle() {
  const { themeMode, toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {themeMode === "dark" ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}

export default ThemeToggle;
