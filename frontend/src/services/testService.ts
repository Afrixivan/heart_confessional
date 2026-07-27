import { request } from './httpClient';
import type { PsychologicalTest, TestResult, TestAnswer } from '../types';

// 获取测试列表
export function getTests(category?: string, page = 1, limit = 20) {
  return request<{ tests: PsychologicalTest[]; total: number }>({
    method: 'GET',
    url: '/tests',
    params: { category, page, limit },
  });
}

// 获取测试详情
export function getTestDetail(testId: string) {
  return request<PsychologicalTest>({
    method: 'GET',
    url: `/tests/${testId}`,
  });
}

// 提交测试答案
export function submitTest(testId: string, answers: TestAnswer[]) {
  return request<TestResult>({
    method: 'POST',
    url: `/tests/${testId}/submit`,
    data: { answers },
  });
}

// 获取测试历史
export function getTestHistory(page = 1, limit = 20) {
  return request<{ results: TestResult[]; total: number }>({
    method: 'GET',
    url: '/tests/history',
    params: { page, limit },
  });
}
