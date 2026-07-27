import { useState, useCallback, useEffect } from 'react';
import { Button, Tooltip, message, Spin } from 'antd';
import { ReloadOutlined, MoreOutlined } from '@ant-design/icons';
import ChatSidebar from '../components/chat/ChatSidebar';
import MessageList from '../components/chat/MessageList';
import ChatInput from '../components/chat/ChatInput';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  addMessage,
  clearMessages,
  setStreaming,
  setTyping,
  setConversations,
  setCurrentConversation,
  updateLastAssistantMessage,
  removeLastMessage,
  setMessages,
} from '../store/slices/chatSlice';
import { streamMessage, getConversations, createConversation, getConversationDetail } from '../services/chatService';
import { MOCK_RESPONSES, GREETING_MESSAGE } from '../constants';
import type { Conversation, Message } from '../types';

export default function ChatPage() {
  const dispatch = useAppDispatch();
  const { messages, isStreaming, isTyping, currentConversationId, conversations } = useAppSelector(
    (state) => state.chat
  );
  const [currentTitle, setCurrentTitle] = useState('新对话');
  const [loading, setLoading] = useState(false);

  // 获取对话列表
  const fetchConversations = useCallback(async () => {
    try {
      const response = await getConversations();
      if (response.success && response.data) {
        const convs: Conversation[] = response.data.conversations.map((c: any) => ({
          ...c,
          status: 'active' as const,
        }));
        dispatch(setConversations(convs));
      }
    } catch {
      // 失败时不做处理，保持原有状态
    }
  }, [dispatch]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // 模拟流式响应（当后端 API 不可用时使用）
  const simulateStreamResponse = useCallback(
    (content: string) => {
      const reply =
        MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];

      dispatch(setTyping(true));

      setTimeout(() => {
        dispatch(setTyping(false));
        dispatch(setStreaming(true));

        // 添加空白的助手消息
        const assistantMessage: Message = {
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
        };
        dispatch(addMessage(assistantMessage));

        // 模拟逐字打字
        let index = 0;
        const interval = setInterval(() => {
          if (index < reply.length) {
            dispatch(updateLastAssistantMessage(reply[index]));
            index++;
          } else {
            clearInterval(interval);
            dispatch(setStreaming(false));
          }
        }, 50);
      }, 800);

      // 忽略未使用的 content 参数（保留用于将来扩展）
      void content;
    },
    [dispatch]
  );

  const handleSend = useCallback(
    async (content: string) => {
      // 添加用户消息
      const userMessage: Message = {
        role: 'user',
        content,
        timestamp: new Date().toISOString(),
      };
      dispatch(addMessage(userMessage));

      // 如果没有当前对话，先创建新对话
      let convId = currentConversationId;
      if (!convId) {
        try {
          const createRes = await createConversation(content.substring(0, 20) || '新对话');
          if (createRes.success && createRes.data) {
            convId = createRes.data.conversation_id;
            dispatch(setCurrentConversation(convId));
            setCurrentTitle(createRes.data.title);
            // 刷新对话列表
            await fetchConversations();
          }
        } catch {
          // 创建失败，使用模拟响应
          simulateStreamResponse(content);
          return;
        }
      }

      // 确保 convId 有值
      if (!convId) {
        simulateStreamResponse(content);
        return;
      }

      // 尝试后端流式接口
      try {
        dispatch(setTyping(true));

        // 创建空白的助手消息
        const assistantMessage: Message = {
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
        };
        dispatch(addMessage(assistantMessage));

        await streamMessage(convId, content, {
          onMessage: (chunk) => {
            dispatch(setTyping(false));
            dispatch(setStreaming(true));
            dispatch(updateLastAssistantMessage(chunk));
          },
          onDone: () => {
            dispatch(setStreaming(false));
            dispatch(setTyping(false));
            // 发送完成后刷新对话列表
            fetchConversations();
          },
          onError: () => {
            dispatch(setTyping(false));
            dispatch(removeLastMessage());
            simulateStreamResponse(content);
          },
        });
      } catch {
        simulateStreamResponse(content);
      }
    },
    [currentConversationId, dispatch, simulateStreamResponse, fetchConversations]
  );

  const handleNewChat = async () => {
    dispatch(clearMessages());
    dispatch(setCurrentConversation(null));
    setCurrentTitle('新对话');
    message.success('已开始新的对话');
  };

  const handleSelectConversation = async (id: string) => {
    setLoading(true);
    dispatch(setCurrentConversation(id));

    try {
      const response = await getConversationDetail(id);
      if (response.success && response.data) {
        const conv = response.data;
        setCurrentTitle(conv.title);
        
        // 转换消息格式并设置
        const msgs: Message[] = conv.messages.map((m: any) => ({
          message_id: m.message_id,
          conversation_id: m.conversation_id,
          role: m.role as Message['role'],
          content: m.content,
          timestamp: m.timestamp,
        }));
        
        if (msgs.length > 0) {
          dispatch(setMessages(msgs));
        } else {
          dispatch(setMessages([
            {
              role: 'assistant',
              content: GREETING_MESSAGE,
              timestamp: new Date().toISOString(),
            },
          ]));
        }
      }
    } catch {
      message.error('获取对话详情失败');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    dispatch(clearMessages());
    message.success('对话已重置');
  };

  return (
    <div className="flex h-full" style={{ height: 'calc(100vh - 64px)' }}>
      <ChatSidebar
        conversations={conversations}
        currentId={currentConversationId}
        loading={loading}
        onSelect={handleSelectConversation}
        onNewChat={handleNewChat}
      />

      <main className="flex-1 flex flex-col bg-background">
        {/* 对话头部 */}
        <div className="px-5 py-4 bg-white border-b border-border flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{currentTitle}</h3>
            <p className="text-xs text-text-muted">
              开始于 {new Date().toLocaleDateString('zh-CN')}
            </p>
          </div>
          <div className="flex gap-2">
            <Tooltip title="重新开始">
              <Button
                shape="circle"
                icon={<ReloadOutlined />}
                onClick={handleReset}
                className="!border-border hover:!border-primary"
              />
            </Tooltip>
            <Tooltip title="更多选项">
              <Button
                shape="circle"
                icon={<MoreOutlined />}
                className="!border-border hover:!border-primary"
              />
            </Tooltip>
          </div>
        </div>

        {/* 消息列表 */}
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <MessageList messages={messages} isTyping={isTyping} />
        )}

        {/* 输入框 */}
        <ChatInput onSend={handleSend} disabled={isStreaming || isTyping} />
      </main>
    </div>
  );
}