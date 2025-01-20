import { useState, useEffect } from "react";

const ThemeProvider = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light" // Retrieve theme from localStorage or default to light
  );

  const isDark = theme === "dark";

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme to HTML root
  useEffect(() => {
    const root = window.document.documentElement;
    root.setAttribute("data-theme", theme); // DaisyUI theme
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return { theme, toggleTheme, isDark };
};

export default ThemeProvider;
