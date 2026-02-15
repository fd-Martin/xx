import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label
      className="flex cursor-pointer items-center  transition-all duration-300 p-1 "
      onClick={handleThemeSwitch}
    >
      {/* Sun Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme === "light" ? "black" : "#9ca3af"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-500 ${
          theme === "light" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        }`}
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
      </svg>

      {/* Toggle */}
      <div
        className={`relative w-12 sm:w-14 h-6 sm:h-7 rounded-full transition-colors duration-300 ${
          theme === "light" ? "bg-gray-300" : "bg-blue-800"
        }`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
            theme === "light" ? "translate-x-0" : "translate-x-6 sm:translate-x-7"
          }`}
        />
      </div>

      {/* Moon Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke={theme === "dark" ? "white" : "#9ca3af"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`transition-transform duration-500 ${
          theme === "dark" ? "rotate-0 scale-100" : "rotate-90 scale-0"
        }`}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"></path>
      </svg>
    </label>
  );
};

export default ThemeToggle;