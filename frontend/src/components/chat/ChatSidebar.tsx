import { Button, Empty, Spin } from 'antd';
import { PlusOutlined, MessageOutlined } from '@ant-design/icons';
import type { Conversation } from '../../types';

interface ChatSidebarProps {
  conversations: Conversation[];
  currentId: string | null;
  loading?: boolean;
  onSelect: (id: string) => void;
  onNewChat: () => void;
}

export default function ChatSidebar({
  conversations,
  currentId,
  loading,
  onSelect,
  onNewChat,
}: ChatSidebarProps) {
  const formatTime = (time: string) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const day = 24 * 60 * 60 * 1000;

    if (diff < 60 * 1000) return '刚刚';
    if (diff < day && now.getDate() === date.getDate()) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    if (diff < 2 * day) return '昨天';
    if (diff < 7 * day) return `${Math.floor(diff / day)}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <aside className="w-80 bg-white border-r border-border flex flex-col">
      <div className="p-5 border-b border-border">
        <h3 className="text-lg font-semibold mb-3">对话历史</h3>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          block
          className="!bg-primary !border-primary hover:!bg-primary-dark"
          onClick={onNewChat}
        >
          新对话
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2.5">
        {loading ? (
          <div className="flex justify-center py-8">
            <Spin />
          </div>
        ) : conversations.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="暂无对话记录"
            className="py-8"
          />
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.conversation_id}
              onClick={() => onSelect(conv.conversation_id)}
              className={`p-3.5 rounded-md cursor-pointer transition-all mb-1.5 hover:bg-background ${
                currentId === conv.conversation_id ? 'bg-primary-light' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="w-11 h-11 rounded-full gradient-primary flex items-center justify-center flex-shrink-0 text-white">
                  <MessageOutlined />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold mb-1 truncate">{conv.title}</div>
                  <div className="text-[13px] text-text-secondary truncate">
                    {conv.last_message}
                  </div>
                </div>
                <div className="text-xs text-text-muted flex-shrink-0">
                  {formatTime(conv.updated_at)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
