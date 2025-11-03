'use client';

import { useState } from 'react';
import { StatsPanel } from '@/components/stats/StatsPanel';
import { LicensesTable } from '@/components/licenses/LicensesTable';
import { FeedbackTable } from '@/components/feedback/FeedbackTable';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';

type Tab = 'licenses' | 'feedback';

export default function Home() {
  const { isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('licenses');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Панель управления
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Управление лицензионными ключами и заявками обратной связи
          </p>
        </div>
        
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('licenses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'licenses'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Лицензии
            </button>
            <button
              onClick={() => setActiveTab('feedback')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'feedback'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:border-gray-300'
              }`}
            >
              Обратная связь
            </button>
          </nav>
        </div>

        {activeTab === 'licenses' ? (
          <>
            <StatsPanel />
            <LicensesTable />
          </>
        ) : (
          <FeedbackTable />
        )}
      </main>
    </div>
  );
}