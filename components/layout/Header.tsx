'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const { logout } = useAuth();

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString('ru-RU'));
    
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString('ru-RU'));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (confirm('Вы уверены, что хотите выйти?')) {
      logout();
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
              Block Builder Admin
            </h1>
            <span className="px-3 py-1 text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Live
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {currentTime && (
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium hidden sm:block">
                {currentTime}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              Выйти
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 flex items-center justify-center text-white font-bold shadow-md">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
