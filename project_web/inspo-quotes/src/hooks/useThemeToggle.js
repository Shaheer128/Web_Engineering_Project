import { useState } from "react";

function useThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);
  return [darkMode, toggleTheme];
}

export default useThemeToggle;
