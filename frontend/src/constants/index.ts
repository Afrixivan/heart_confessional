// 应用常量配置

// API 基础路径
export const API_BASE_URL = '/api';


// 本地存储键名
export const STORAGE_KEYS = {
  TOKEN: 'heart_confessional_token',
  USER: 'heart_confessional_user',
  CONVERSATIONS: 'heart_confessional_conversations',
} as const;

// 路由路径
export const ROUTES = {
  HOME: '/',
  CHAT: '/chat',
  EMOTION: '/emotion',
  KNOWLEDGE: '/knowledge',
  TEST: '/test',
  DIARY: '/diary',
  BREATHING: '/breathing',
  LOGIN: '/login',
} as const;

// 情绪类型映射
export const EMOTION_MAP = {
  happy: { label: '开心', emoji: '😊', color: '#98FB98', bgClass: 'bg-secondary-green-light', textClass: 'text-green-700' },
  sad: { label: '难过', emoji: '😔', color: '#87CEEB', bgClass: 'bg-blue-100', textClass: 'text-blue-600' },
  anxious: { label: '焦虑', emoji: '😰', color: '#FFB7C5', bgClass: 'bg-primary-light', textClass: 'text-primary-dark' },
  angry: { label: '生气', emoji: '😠', color: '#FF6B6B', bgClass: 'bg-red-100', textClass: 'text-red-600' },
  neutral: { label: '平静', emoji: '😐', color: '#D3D3D3', bgClass: 'bg-gray-100', textClass: 'text-gray-600' },
} as const;

// 心理援助资源
export const CRISIS_RESOURCES = {
  HOTLINE: '400-161-9995',
  YOUTH_HOTLINE: '12355',
  EMERGENCY_POLICE: '110',
  EMERGENCY_MEDICAL: '120',
} as const;

// 模拟回复（用于演示）
export const MOCK_RESPONSES = [
  '我很抱歉听到你这么说，你愿意和我分享更多吗？🌱',
  '听起来你最近遇到了一些挑战，我在这里陪伴你💝',
  '谢谢你愿意信任我，说出这些感受。你并不孤单✨',
  '我能感受到你现在的心情，让我们一起慢慢梳理🌿',
  '你的感受是真实且重要的，不要害怕表达它们💪',
  '有时候倾诉本身就是一种力量，你已经做得很棒了🌈',
  '我理解这种感觉，很多人都会有类似的经历🌻',
  '让我们一起看看有没有什么办法可以帮助你🌼',
];

// 默认问候语
export const GREETING_MESSAGE = `你好呀！我是心灵树洞，很高兴认识你🌱

我是一个温暖、包容、耐心、真诚的朋友，随时在这里听你倾诉。无论是学业压力、人际关系、情感问题还是其他困扰，都可以和我说说。

我不是专业心理咨询师，不能提供医学诊断或治疗建议，但我会尽我所能陪伴你、支持你。

现在，你想聊些什么呢？💝`;

// 测试分类
export const TEST_CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'anxiety', label: '焦虑' },
  { key: 'depression', label: '抑郁' },
  { key: 'stress', label: '压力' },
  { key: 'sleep', label: '睡眠' },
  { key: 'personality', label: '性格' },
] as const;

// 知识分类
export const KNOWLEDGE_CATEGORIES = [
  { key: 'all', label: '全部' },
  { key: 'anxiety', label: '焦虑' },
  { key: 'stress', label: '压力管理' },
  { key: 'relationship', label: '人际关系' },
  { key: 'emotion', label: '情绪管理' },
  { key: 'growth', label: '自我成长' },
] as const;

// 日记分类
export const DIARY_CATEGORIES = [
  { key: 'daily', label: '日常生活' },
  { key: 'study', label: '学业压力' },
  { key: 'relationship', label: '人际关系' },
  { key: 'emotion', label: '情绪记录' },
  { key: 'other', label: '其他' },
] as const;
