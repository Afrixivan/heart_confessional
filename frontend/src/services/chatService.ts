import { request } from './httpClient';
import type {
  Conversation,
  ConversationDetail,
  Message,
  ApiResponse,
} from '../types';

// 创建对话会话
export function createConversation(title: string) {
  return request<{ conversation_id: string; title: string; created_at: string }>({
    method: 'POST',
    url: '/conversations',
    data: { title },
  });
}

// 获取对话列表
export function getConversations(page = 1, limit = 20) {
  return request<{ conversations: Conversation[]; total: number; page: number; limit: number }>({
    method: 'GET',
    url: '/conversations',
    params: { page, limit },
  });
}

// 获取对话详情
export function getConversationDetail(conversationId: string) {
  return request<ConversationDetail>({
    method: 'GET',
    url: `/conversations/${conversationId}`,
  });
}

// 发送消息（非流式）
export function sendMessage(conversationId: string, content: string) {
  return request<Message>({
    method: 'POST',
    url: `/conversations/${conversationId}/messages`,
    data: { content },
  });
}

// 删除对话
export function deleteConversation(conversationId: string) {
  return request<null>({
    method: 'DELETE',
    url: `/conversations/${conversationId}`,
  });
}

/**
 * 发送消息（流式响应）
 * 使用 fetch API + ReadableStream 消费 SSE
 * 支持自定义 headers 与 POST 请求
 */
export async function streamMessage(
  conversationId: string,
  content: string,
  callbacks: {
    onMessage: (chunk: string) => void;
    onError?: (error: Error) => void;
    onDone?: (fullResponse: string) => void;
  }
): Promise<void> {
  const token = localStorage.getItem('heart_confessional_token');
  const url = `/api/conversations/${conversationId}/messages/stream`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('ReadableStream not supported');
    }

    const decoder = new TextDecoder();
    let fullResponse = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('event:')) {
          continue;
        }

        if (trimmedLine.startsWith('data:')) {
          const dataStr = trimmedLine.slice(5).trim();
          try {
            const data = JSON.parse(dataStr);
            if (data.content) {
              fullResponse += data.content;
              callbacks.onMessage(data.content);
            }
            if (data.status === 'completed') {
              callbacks.onDone?.(fullResponse);
              return;
            }
          } catch {
            // 忽略解析错误
          }
        }
      }
    }

    callbacks.onDone?.(fullResponse);
  } catch (error) {
    callbacks.onError?.(error as Error);
  }
}
