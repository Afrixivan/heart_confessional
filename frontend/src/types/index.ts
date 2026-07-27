// 用户相关类型
export interface User {
  user_id: string;
  nickname: string;
  avatar: string;
  email: string;
  is_anonymous: boolean;
  created_at?: string;
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

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user_id: string;
    nickname: string;
    token: string;
    is_anonymous?: boolean;
  };
}

// 对话相关类型
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  message_id?: string;
  conversation_id?: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  emotion_tags?: string[];
  support_level?: 'low' | 'medium' | 'high' | 'crisis';
}

export interface Conversation {
  conversation_id: string;
  title: string;
  status: 'active' | 'ended';
  last_message: string;
  turn_count: number;
  created_at: string;
  updated_at: string;
}

export interface ConversationDetail {
  conversation_id: string;
  title: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
}

// 情绪相关类型
export type EmotionType = 'happy' | 'sad' | 'anxious' | 'angry' | 'neutral';

export interface EmotionRecord {
  record_id: string;
  timestamp: string;
  emotion_analysis: {
    primary_emotion: EmotionType;
    intensity_scores: { primary: number };
  };
  support_level: 'low' | 'medium' | 'high' | 'crisis';
}

export interface EmotionReport {
  period: string;
  start_date: string;
  end_date: string;
  total_records: number;
  emotion_summary: Array<{
    emotion_type: string;
    count: number;
    avg_intensity: number;
    triggers: string[];
  }>;
  trend_data: Array<{
    date: string;
    primary_emotion: string;
    intensity: number;
  }>;
  key_findings: string[];
  suggestions: string[];
}

// 知识库相关类型
export interface Knowledge {
  knowledge_id: string;
  title: string;
  concept: string;
  scenarios: string[];
  techniques: string[];
  tips: string;
  category: string;
  keywords?: string[];
}

// 心理测试相关类型
export interface TestOption {
  option_id: string;
  content: string;
  score: number;
}

export interface TestQuestion {
  question_id: string;
  content: string;
  options: TestOption[];
}

export interface PsychologicalTest {
  test_id: string;
  title: string;
  description: string;
  category: string;
  questions: TestQuestion[];
}

export interface TestResult {
  result_id: string;
  test_id: string;
  test_title: string;
  score: number;
  level: string;
  description: string;
  suggestions: string[];
  created_at: string;
}

export interface TestAnswer {
  question_id: string;
  option_id: string;
}

// 日记相关类型
export interface Diary {
  diary_id: string;
  title: string;
  content: string;
  emotion_tag: EmotionType;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface DiaryRequest {
  title: string;
  content: string;
  emotion_tag: EmotionType;
  category: string;
}

// 资源相关类型
export interface Resource {
  resource_id: string;
  title: string;
  type: 'book' | 'article' | 'course' | 'video';
  description: string;
  url: string;
  category: string;
  cover_image: string;
  rating: number;
  views: number;
}

// API 通用响应类型
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  limit: number;
  data: T[];
}

// 组件 Props 类型
export interface AuthModalProps {
  open: boolean;
  mode: 'login' | 'register';
  onClose: () => void;
  onSwitchMode: (mode: 'login' | 'register') => void;
}
