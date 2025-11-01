'use client';

import { useState } from 'react';
import { License } from '@/types/license';
import { licenseAPI } from '@/lib/api/license';

interface EditLicenseModalProps {
  license: License;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditLicenseModal({ license, onClose, onSuccess }: EditLicenseModalProps) {
  const [email, setEmail] = useState(license.email);
  const [domain, setDomain] = useState(license.domain);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updates: { email?: string; domain?: string } = {};
      
      if (email !== license.email) {
        updates.email = email;
      }
      
      if (domain !== license.domain) {
        updates.domain = domain;
      }

      if (Object.keys(updates).length > 0) {
        await licenseAPI.updateLicense(license.key, updates);
      }
      
      onSuccess();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md zoom-in transition-colors">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Редактировать лицензию</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Обновите информацию о лицензионном ключе</p>
        </div>
        
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Ключ</label>
            <input
              type="text"
              disabled
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 font-mono text-sm text-gray-600 dark:text-gray-400"
              value={license.key}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Домен</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400 dark:placeholder-gray-500"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Укажите домен, на котором будет использоваться лицензия. Форматы: <span className="font-mono">example.com</span>, <span className="font-mono">www.example.com</span>, <span className="font-mono">https://example.com</span>. 
              Протокол и префикс www будут автоматически удалены, порт игнорируется.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Статус</label>
            <input
              type="text"
              disabled
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              value={license.status}
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-medium text-gray-700 dark:text-gray-300 cursor-pointer"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium shadow-md cursor-pointer"
            >
              {loading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
