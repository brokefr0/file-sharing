"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Moon, Sun } from "lucide-react";

function Header() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Check local storage or system preference on mount
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link className="flex items-center gap-2 transition hover:opacity-75" href="/">
          <div className="rounded-lg bg-blue-600 p-1.5">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">File Share</span>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium">
              <li>
                <Link className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition" href="/upload">
                  Upload
                </Link>
              </li>
              <li>
                <Link className="text-gray-500 hover:text-blue-600 dark:text-gray-300 dark:hover:text-white transition" href="/files">
                  Files
                </Link>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition text-gray-700 dark:text-gray-200"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
