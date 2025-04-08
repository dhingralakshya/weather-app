import React from 'react';
import ThemeToggle from './ThemeToggle';

function Header({ theme, toggleTheme }) {
  return (
    <header className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 font-medium border-b-2 border-gray-200 dark:border-gray-700 shadow-md mb-5 flex justify-between items-center">
      <h1 className="text-2xl font-semibold">Weather App</h1>
      <button
        onClick={toggleTheme}
        className="bg-transparent border-none focus:outline-none hover:opacity-90 transition"
      >
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </button>
    </header>
  );
}

export default Header;
