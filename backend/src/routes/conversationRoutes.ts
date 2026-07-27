import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth';
import {
  createConversation as createConv,
  getConversationsByUserId,
  getConversationById,
  addMessage,
  getMessagesByConversationId,
  deleteConversation as deleteConv,
} from '../data/memoryStore';
import { generateChatResponse, generateChatResponseNonStream } from '../services/aiService';
import { ChatMessage } from '../types';

const router = Router();

router.post('/', authenticate, (req: Request<{}, {}, { title: string }>, res: Response) => {
  const { title } = req.body;
  const userId = req.user?.userId;
  
  if (!userId) {
    res.status(401).json({ success: false, message: '未授权', data: null });
    return;
  }
  
  const conversation = createConv(userId, title || '新对话');
  
  res.status(200).json({
    success: true,
    message: '创建成功',
    data: {
      conversation_id: conversation.id,
      title: conversation.title,
      created_at: conversation.created_at.toISOString(),
    },
  });
});

router.get('/', authenticate, (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const page = parseInt(String(req.query.page)) || 1;
  const limit = parseInt(String(req.query.limit)) || 20;
  
  if (!userId) {
    res.status(401).json({ success: false, message: '未授权', data: null });
    return;
  }
  
  const { conversations, total } = getConversationsByUserId(userId, page, limit);
  
  res.status(200).json({
    success: true,
    message: '获取成功',
    data: {
      conversations: conversations.map(c => ({
        conversation_id: c.id,
        title: c.title,
        last_message: c.last_message,
        updated_at: c.updated_at.toISOString(),
        turn_count: c.turn_count,
      })),
      total,
      page,
      limit,
    },
  });
});

router.get('/:conversationId', authenticate, (req: Request<{ conversationId: string }>, res: Response) => {
  const userId = req.user?.userId;
  const { conversationId } = req.params;
  
  if (!userId) {
    res.status(401).json({ success: false, message: '未授权', data: null });
    return;
  }
  
  const conversation = getConversationById(conversationId);
  
  if (!conversation || conversation.user_id !== userId) {
    res.status(404).json({ success: false, message: '对话不存在', data: null });
    return;
  }
  
  const msgs = getMessagesByConversationId(conversationId);
  
  res.status(200).json({
    success: true,
    message: '获取成功',
    data: {
      conversation_id: conversation.id,
      title: conversation.title,
      messages: msgs.map(m => ({
        message_id: m.id,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      })),
      created_at: conversation.created_at.toISOString(),
      updated_at: conversation.updated_at.toISOString(),
    },
  });
});

router.post('/:conversationId/messages', authenticate, async (req: Request<{ conversationId: string }, {}, { content: string }>, res: Response) => {
  const userId = req.user?.userId;
  const { conversationId } = req.params;
  const { content } = req.body;
  
  if (!userId) {
    res.status(401).json({ success: false, message: '未授权', data: null });
    return;
  }
  
  const conversation = getConversationById(conversationId);
  
  if (!conversation || conversation.user_id !== userId) {
    res.status(404).json({ success: false, message: '对话不存在', data: null });
    return;
  }
  
  addMessage(conversationId, 'user', content);
  
  const messages = getMessagesByConversationId(conversationId);
  const chatMessages: ChatMessage[] = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content,
  }));
  
  const aiResponse = await generateChatResponseNonStream(chatMessages);
  addMessage(conversationId, 'assistant', aiResponse);
  
  res.status(200).json({
    success: true,
    message: '发送成功',
    data: {
      message_id: `msg_${Date.now()}`,
      role: 'assistant' as const,
      content: aiResponse,
      timestamp: new Date().toISOString(),
    },
  });
});

router.post('/:conversationId/messages/stream', authenticate, async (req: Request<{ conversationId: string }, {}, { content: string }>, res: Response) => {
  const userId = req.user?.userId;
  const { conversationId } = req.params;
  const { content } = req.body;
  
  if (!userId) {
    res.status(401).json({ success: false, message: '未授权', data: null });
    return;
  }
  
  const conversation = getConversationById(conversationId);
  
  if (!conversation || conversation.user_id !== userId) {
    res.status(404).json({ success: false, message: '对话不存在', data: null });
    return;
  }
  
  addMessage(conversationId, 'user', content);
  
  const messages = getMessagesByConversationId(conversationId);
  const chatMessages: ChatMessage[] = messages.map(m => ({
    role: m.role === 'user' ? 'user' : 'assistant',
    content: m.content,
  }));
  
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  
  let fullResponse = '';
  
  try {
    await generateChatResponse(chatMessages, (chunk) => {
      if (chunk.content) {
        fullResponse += chunk.content;
        res.write(`data: ${JSON.stringify({ content: chunk.content, status: chunk.status })}\n\n`);
      } else if (chunk.status === 'completed') {
        res.write(`data: ${JSON.stringify({ content: '', status: 'completed' })}\n\n`);
      }
    });
    
    addMessage(conversationId, 'assistant', fullResponse);
    res.end();
  } catch (error) {
    console.error('Stream error:', error);
    res.write(`data: ${JSON.stringify({ content: '', status: 'completed' })}\n\n`);
    res.end();
  }
});

router.delete('/:conversationId', authenticate, (req: Request<{ conversationId: string }>, res: Response) => {
  const userId = req.user?.userId;
  const { conversationId } = req.params;
  
  if (!userId) {
    res.status(401).json({ success: false, message: '未授权', data: null });
    return;
  }
  
  const conversation = getConversationById(conversationId);
  
  if (!conversation || conversation.user_id !== userId) {
    res.status(404).json({ success: false, message: '对话不存在', data: null });
    return;
  }
  
  deleteConv(conversationId);
  
  res.status(200).json({
    success: true,
    message: '删除成功',
    data: null,
  });
});

export default router;