import { request } from './httpClient';
import type { Knowledge } from '../types';

// 获取知识分类列表
export function getKnowledgeCategories() {
  return request<string[]>({
    method: 'GET',
    url: '/knowledge/categories',
  });
}

// 搜索知识条目
export function searchKnowledge(keyword: string, category?: string, page = 1, limit = 20) {
  return request<{ knowledge: Knowledge[]; total: number }>({
    method: 'GET',
    url: '/knowledge/search',
    params: { keyword, category, page, limit },
  });
}

// 获取知识详情
export function getKnowledgeDetail(knowledgeId: string) {
  return request<Knowledge>({
    method: 'GET',
    url: `/knowledge/${knowledgeId}`,
  });
}
