export interface User {
  id: string;
  email?: string;
  nickname: string;
  password?: string;
  is_anonymous: boolean;
  created_at: Date;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  last_message?: string;
  turn_count: number;
  created_at: Date;
  updated_at: Date;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface StreamResponse {
  content: string;
  status: 'streaming' | 'completed';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nickname: string;
}