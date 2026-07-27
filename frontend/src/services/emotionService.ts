import { request } from './httpClient';
import type { EmotionRecord, EmotionReport } from '../types';

// 获取情绪记录列表
export function getEmotions(startDate?: string, endDate?: string, page = 1, limit = 20) {
  return request<{ emotions: EmotionRecord[]; total: number }>({
    method: 'GET',
    url: '/emotions',
    params: { start_date: startDate, end_date: endDate, page, limit },
  });
}

// 获取情绪分析报告
export function getEmotionReport(period: 'week' | 'month' | 'custom', startDate?: string, endDate?: string) {
  return request<EmotionReport>({
    method: 'GET',
    url: '/emotions/report',
    params: { period, start_date: startDate, end_date: endDate },
  });
}
