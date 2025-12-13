import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  // Отключаем строгую CSRF проверку для API маршрутов авторизации
  // так как они должны работать из браузера
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
