export interface License {
  id: string;
  key: string;
  type: 'FREE' | 'PRO';
  email: string;
  domain: string;
  status: 'active' | 'inactive' | 'suspended' | 'expired';
  purchasedAt: string;
  expiresAt?: string;
  usageCount: number;
  lastUsed?: string;
  source: string;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface LicenseStats {
  total: number;
  active: number;
  used: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
}

export interface CreateLicenseRequest {
  email: string;
  type: 'PRO';
  domain: string;
  customKey?: string;
  metadata?: Record<string, any>;
}
