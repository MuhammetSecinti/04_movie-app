import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

const Switch = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
  );

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white flex items-center justify-center">
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 text-white rounded-md"
    >
      {theme === "dark" ? (
        <>
          <SunIcon className="w-6 h-6 text-yellow-500" />
    
        </>
      ) : (
        <>
          <MoonIcon className="w-6 h-6 text-blue-400" />
        </>
      )}
    </button>
  </div>
  );
};

export default Switch;