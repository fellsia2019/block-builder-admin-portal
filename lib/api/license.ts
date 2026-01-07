import type { License, LicenseStats, CreateLicenseRequest } from '@/types/license';

// Для локальной разработки используем http://localhost:3010 напрямую, для production - https://api.deep-bb.ru
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3010' : 'https://api.deep-bb.ru');

export class LicenseAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  async getAllLicenses(limit = 100, offset = 0, search?: string): Promise<License[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    });
    
    if (search && search.trim()) {
      params.append('search', search.trim());
    }
    
    const response = await fetch(`${this.baseUrl}/api/license?${params.toString()}`);
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to fetch licenses: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return result;
  }

  async getLicenseStats(): Promise<LicenseStats> {
    const response = await fetch(`${this.baseUrl}/api/license/stats`);
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to fetch stats: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return result;
  }

  async getLicenseByKey(key: string): Promise<License | null> {
    const response = await fetch(`${this.baseUrl}/api/license/${key}`);
    if (!response.ok) {
      return null;
    }
    return response.json();
  }

  async createLicense(data: CreateLicenseRequest): Promise<License> {
    const response = await fetch(`${this.baseUrl}/api/license/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to create license: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return result.license;
  }

  async deactivateLicense(key: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/license/${key}/deactivate`, {
      method: 'POST',
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to deactivate license: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  }

  async activateLicense(key: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/license/${key}/activate`, {
      method: 'POST',
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to activate license: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  }

  async updateLicense(key: string, updates: { email?: string; domain?: string }): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/license/${key}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to update license: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  }

  async verifyLicense(key: string, domain?: string): Promise<{ valid: boolean; type: string }> {
    const response = await fetch(`${this.baseUrl}/api/license/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key, domain }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to verify license: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return result;
  }

  async deleteLicense(key: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/license/${key}`, {
      method: 'DELETE',
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to delete license: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  }
}

export const licenseAPI = new LicenseAPI();
