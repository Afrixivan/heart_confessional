import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Conversation, Message } from '../../types';
import { GREETING_MESSAGE } from '../../constants';

export interface ChatState {
  conversations: Conversation[];
  currentConversationId: string | null;
  messages: Message[];
  isStreaming: boolean;
  isTyping: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  currentConversationId: null,
  messages: [
    {
      role: 'assistant',
      content: GREETING_MESSAGE,
      timestamp: new Date().toISOString(),
    },
  ],
  isStreaming: false,
  isTyping: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setConversations: (state, action: PayloadAction<Conversation[]>) => {
      state.conversations = action.payload;
    },
    setCurrentConversation: (state, action: PayloadAction<string | null>) => {
      state.currentConversationId = action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    updateLastAssistantMessage: (state, action: PayloadAction<string>) => {
      // 更新流式响应的最新助手消息
      const lastAssistantIdx = [...state.messages]
        .reverse()
        .findIndex((m) => m.role === 'assistant');
      if (lastAssistantIdx !== -1) {
        const actualIdx = state.messages.length - 1 - lastAssistantIdx;
        state.messages[actualIdx].content += action.payload;
      }
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [
        {
          role: 'assistant',
          content: GREETING_MESSAGE,
          timestamp: new Date().toISOString(),
        },
      ];
    },
    removeLastMessage: (state) => {
      if (state.messages.length > 0) {
        state.messages.pop();
      }
    },
    setStreaming: (state, action: PayloadAction<boolean>) => {
      state.isStreaming = action.payload;
    },
    setTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isStreaming = false;
      state.isTyping = false;
    },
  },
});

export const {
  setConversations,
  setCurrentConversation,
  addMessage,
  updateLastAssistantMessage,
  setMessages,
  clearMessages,
  removeLastMessage,
  setStreaming,
  setTyping,
  setError,
} = chatSlice.actions;

export default chatSlice.reducer;
