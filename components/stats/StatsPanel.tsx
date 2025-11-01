'use client';

import { useState, useEffect } from 'react';
import { LicenseStats } from '@/types/license';
import { licenseAPI } from '@/lib/api/license';

export function StatsPanel() {
  const [stats, setStats] = useState<LicenseStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
    const interval = setInterval(loadStats, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadStats = async () => {
    try {
      const data = await licenseAPI.getLicenseStats();
      setStats(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading || !stats) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Загрузка статистики...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white border border-blue-400/20">
        <div className="flex items-center justify-between mb-3">
          <div className="text-blue-100 text-sm font-semibold uppercase tracking-wide">
            Всего ключей
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
        </div>
        <div className="text-4xl font-bold">{stats.total}</div>
        <div className="text-blue-100 text-xs mt-2">Всего лицензий в системе</div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white border border-green-400/20">
        <div className="flex items-center justify-between mb-3">
          <div className="text-green-100 text-sm font-semibold uppercase tracking-wide">
            Активных
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <div className="text-4xl font-bold">{stats.active}</div>
        <div className="text-green-100 text-xs mt-2">Активно используются</div>
      </div>

      <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white border border-purple-400/20">
        <div className="flex items-center justify-between mb-3">
          <div className="text-purple-100 text-sm font-semibold uppercase tracking-wide">
            Используются
          </div>
          <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <div className="text-4xl font-bold">{stats.used}</div>
        <div className="text-purple-100 text-xs mt-2">Действующие лицензии</div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 transition-colors">
        <div className="text-gray-700 dark:text-gray-300 text-sm font-medium uppercase tracking-wide mb-4">
          Типы лицензий
        </div>
        <div className="space-y-3">
          {Object.entries(stats.byType).map(([type, count]) => (
            <div key={type} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  type === 'PRO' ? 'bg-blue-500' :
                  'bg-gray-400'
                }`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">{type}</span>
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
