// types/seedling.ts

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  builder_name: string;
  builder_email: string;
  demo_url?: string | null;
  github_url?: string | null;
  target_amount: number;
  ai_score: number;
  ai_summary: string;
  ai_strengths: string[];
  created_at?: string;
}

export interface Donation {
  id: string;
  project_id: string;
  backer_name: string;
  amount: number;
  paypal_order_id: string;
  message?: string | null;
  created_at?: string;
}

export interface ProjectWithFunding extends Project {
  raised_amount: number;
  backer_count: number;
  donations: Donation[];
}

// POST /api/projects/evaluate
export interface EvaluateProjectRequest {
  title: string;
  tagline: string;
  description: string;
  builder_name: string;
  builder_email: string;
  demo_url?: string;
  github_url?: string;
  target_amount: number;
}

export interface EvaluateProjectResponse {
  success?: boolean;
  project?: Project;
  error?: string;
}

// POST /api/payments/create-order
export interface CreateOrderRequest {
  amount: number;
}

export interface CreateOrderResponse {
  id?: string;
  status?: string;
  error?: string;
}

// POST /api/payments/capture-order
export interface CaptureOrderRequest {
  orderId: string;
  projectId: string;
  backerName?: string;
  amount: number;
  message?: string;
}

export interface CaptureOrderResponse {
  success?: boolean;
  donation?: Donation;
  captureData?: {
    status?: string;
    [key: string]: unknown;
  };
  error?: string;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}