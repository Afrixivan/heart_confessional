import { User, Conversation, Message } from '../types';

const users: Map<string, User> = new Map();
const conversations: Map<string, Conversation> = new Map();
const messages: Map<string, Message[]> = new Map();

export function createUser(email: string | undefined, nickname: string, password: string | undefined, isAnonymous: boolean): User {
  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const user: User = {
    id,
    email,
    nickname,
    password,
    is_anonymous: isAnonymous,
    created_at: new Date(),
  };
  users.set(id, user);
  return user;
}

export function getUserByEmail(email: string): User | undefined {
  return Array.from(users.values()).find(u => u.email === email);
}

export function getUserById(id: string): User | undefined {
  return users.get(id);
}

export function createConversation(userId: string, title: string): Conversation {
  const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const conversation: Conversation = {
    id,
    user_id: userId,
    title,
    turn_count: 0,
    created_at: new Date(),
    updated_at: new Date(),
  };
  conversations.set(id, conversation);
  messages.set(id, []);
  return conversation;
}

export function getConversationsByUserId(userId: string, page: number, limit: number): { conversations: Conversation[]; total: number } {
  const userConversations = Array.from(conversations.values())
    .filter(c => c.user_id === userId)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  
  const total = userConversations.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return {
    conversations: userConversations.slice(start, end),
    total,
  };
}

export function getConversationById(conversationId: string): Conversation | undefined {
  return conversations.get(conversationId);
}

export function addMessage(conversationId: string, role: 'user' | 'assistant', content: string): Message {
  const id = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const message: Message = {
    id,
    conversation_id: conversationId,
    role,
    content,
    timestamp: new Date(),
  };
  
  const existingMessages = messages.get(conversationId) || [];
  existingMessages.push(message);
  messages.set(conversationId, existingMessages);
  
  const conversation = conversations.get(conversationId);
  if (conversation) {
    conversation.last_message = content;
    conversation.turn_count += role === 'user' ? 1 : 0;
    conversation.updated_at = new Date();
    conversations.set(conversationId, conversation);
  }
  
  return message;
}

export function getMessagesByConversationId(conversationId: string): Message[] {
  return messages.get(conversationId) || [];
}

export function deleteConversation(conversationId: string): boolean {
  if (conversations.has(conversationId)) {
    conversations.delete(conversationId);
    messages.delete(conversationId);
    return true;
  }
  return false;
}