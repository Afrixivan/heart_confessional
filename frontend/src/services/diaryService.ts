import { request } from './httpClient';
import type { Diary, DiaryRequest } from '../types';

// 创建日记
export function createDiary(data: DiaryRequest) {
  return request<{ diary_id: string; title: string; created_at: string }>({
    method: 'POST',
    url: '/diaries',
    data,
  });
}

// 获取日记列表
export function getDiaries(category?: string, emotionTag?: string, page = 1, limit = 20) {
  return request<{ diaries: Diary[]; total: number }>({
    method: 'GET',
    url: '/diaries',
    params: { category, emotion_tag: emotionTag, page, limit },
  });
}

// 获取日记详情
export function getDiaryDetail(diaryId: string) {
  return request<Diary>({
    method: 'GET',
    url: `/diaries/${diaryId}`,
  });
}

// 更新日记
export function updateDiary(diaryId: string, data: DiaryRequest) {
  return request<{ diary_id: string; updated_at: string }>({
    method: 'PUT',
    url: `/diaries/${diaryId}`,
    data,
  });
}

// 删除日记
export function deleteDiary(diaryId: string) {
  return request<null>({
    method: 'DELETE',
    url: `/diaries/${diaryId}`,
  });
}
