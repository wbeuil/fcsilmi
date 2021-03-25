import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import SunIcon from "../icons/sun.svg";
import MoonIcon from "../icons/moon.svg";

const Button = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <button
      aria-label="Changer de mode"
      type="button"
      className="bg-gray-200 dark:bg-gray-800 rounded p-3 ml-4 h-10 w-10 focus:outline-none focus:ring focus:border-blue-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {mounted && (theme === "dark" ? <SunIcon /> : <MoonIcon />)}
    </button>
  );
};

export default Button;
