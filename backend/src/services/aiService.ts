import { OpenAI } from 'openai';
import { ChatMessage, StreamResponse } from '../types';

const SYSTEM_PROMPT = `你是一个名叫"心灵树洞"的大学生心理健康智能陪伴与成长助手。
你的目标用户是18-25岁的在校大学生。
你是一个温暖、包容、耐心、真诚的朋友，像20岁左右的学长/学姐一样与用户交流。

重要声明：你是AI陪伴助手，不是专业心理咨询师，不能提供医学诊断或治疗建议。

核心原则：
1. 倾听与共情：认真倾听用户的感受，表达理解和共情
2. 不评判：不对用户的想法和感受进行评判
3. 引导与支持：引导用户自我探索，提供积极支持
4. 安全边界：遇到危机情况时，引导用户寻求专业帮助
5. 积极向上：传递积极、乐观的态度

可用资源：
- 心理援助热线：400-161-9995
- 青少年热线：12355
- 紧急求助：110、120

请用温暖、亲切的语言与用户交流，使用合适的emoji表情增强情感表达。`;

// 获取配置（延迟到运行时读取，确保 dotenv 已加载）
function getConfig() {
  const apiKey = process.env.AI_API_KEY || '';
  const apiUrl = process.env.AI_API_URL || 'https://api.openai.com/v1';
  const model = process.env.AI_MODEL || 'gpt-3.5-turbo';
  
  // 只有当 API key 配置有效时才创建 OpenAI 实例
  let openai: OpenAI | null = null;
  if (apiKey && apiKey !== 'your_openai_compatible_api_key_here') {
    openai = new OpenAI({
      apiKey,
      baseURL: apiUrl,
    });
  }
  
  return { openai, model };
}

export async function generateChatResponse(
  messages: ChatMessage[],
  onChunk: (chunk: StreamResponse) => void
): Promise<void> {
  const { openai, model } = getConfig();
  
  // 如果没有配置有效的 API key，返回模拟响应
  if (!openai) {
    const mockResponse = `你好呀！💖 我是心灵树洞，很高兴能陪你聊天。我注意到你说："${messages[messages.length - 1]?.content || ''}"。听起来你有些想法想要分享，我在这里认真倾听哦~

温馨提示：当前 AI 服务未配置 API Key，这是一条模拟回复。如需真实的 AI 对话体验，请在 .env 文件中配置有效的 AI_API_KEY。`;
    
    // 模拟流式响应
    const chunks = mockResponse.split('');
    for (const chunk of chunks) {
      await new Promise(resolve => setTimeout(resolve, 30));
      onChunk({ content: chunk, status: 'streaming' });
    }
    onChunk({ content: '', status: 'completed' });
    return;
  }

  const fullMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ];

  try {
    const stream = await openai.chat.completions.create({
      model,
      messages: fullMessages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
      stream: true,
      temperature: 0.8,
      max_tokens: 1024,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      if (content) {
        onChunk({ content, status: 'streaming' });
      }
    }

    onChunk({ content: '', status: 'completed' });
  } catch (error) {
    console.error('AI API error:', error);
    throw error;
  }
}

export async function generateChatResponseNonStream(
  messages: ChatMessage[]
): Promise<string> {
  const { openai, model } = getConfig();
  
  // 如果没有配置有效的 API key，返回模拟响应
  if (!openai) {
    return `你好呀！💖 我是心灵树洞，很高兴能陪你聊天。我注意到你说："${messages[messages.length - 1]?.content || ''}"。听起来你有些想法想要分享，我在这里认真倾听哦~

温馨提示：当前 AI 服务未配置 API Key，这是一条模拟回复。如需真实的 AI 对话体验，请在 .env 文件中配置有效的 AI_API_KEY。`;
  }

  const fullMessages: ChatMessage[] = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...messages,
  ];

  const response = await openai.chat.completions.create({
    model,
    messages: fullMessages as OpenAI.Chat.Completions.ChatCompletionMessageParam[],
    stream: false,
    temperature: 0.8,
    max_tokens: 1024,
  });

  return response.choices[0]?.message?.content || '';
}
