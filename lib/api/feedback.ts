import type { FeedbackRequest, FeedbackStatus } from '@/types/feedback';

// Для локальной разработки используем http://localhost:3010 напрямую, для production - https://api.deep-bb.ru
const API_URL = process.env.NEXT_PUBLIC_API_URL || 
  (process.env.NODE_ENV === 'development' ? 'http://localhost:3010' : 'https://api.deep-bb.ru');

export class FeedbackAPI {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_URL;
  }

  async getAllFeedback(limit = 100, offset = 0, status?: FeedbackStatus): Promise<FeedbackRequest[]> {
    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: offset.toString()
    });
    
    if (status) {
      params.append('status', status);
    }
    
    const response = await fetch(`${this.baseUrl}/api/feedback?${params.toString()}`);
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to fetch feedback: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return result;
  }

  async getFeedbackStats(): Promise<{ total: number; active: number; inProgress: number; closed: number }> {
    const response = await fetch(`${this.baseUrl}/api/feedback/stats`);
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to fetch stats: ${response.statusText}`;
      throw new Error(errorMessage);
    }
    
    return result;
  }

  async getFeedbackById(id: string): Promise<FeedbackRequest | null> {
    const response = await fetch(`${this.baseUrl}/api/feedback/${id}`);
    if (!response.ok) {
      return null;
    }
    return response.json();
  }

  async updateFeedbackStatus(id: string, status: FeedbackStatus): Promise<void> {
    const response = await fetch(`${this.baseUrl}/api/feedback/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      const errorMessage = result.error || result.message || `Failed to update feedback status: ${response.statusText}`;
      throw new Error(errorMessage);
    }
  }
}

export const feedbackAPI = new FeedbackAPI();

