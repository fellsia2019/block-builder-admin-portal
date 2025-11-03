export enum FeedbackStatus {
  ACTIVE = 'active',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed'
}

export interface FeedbackRequest {
  id: string;
  name: string;
  email: string | null;
  tel: string | null;
  tg: string | null;
  message: string;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
}

