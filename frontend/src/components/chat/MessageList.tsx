import { useRef, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import type { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
}

function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`message-bubble max-w-[70%] px-5 py-3 rounded-lg ${
        isUser
          ? 'self-end bg-primary text-white'
          : 'self-start bg-white text-text-primary shadow-light'
      }`}
      style={{
        borderBottomRightRadius: isUser ? '8px' : undefined,
        borderBottomLeftRadius: !isUser ? '8px' : undefined,
      }}
    >
      <div className="text-[15px] leading-relaxed whitespace-pre-wrap">
        {message.content}
      </div>
      <div className={`text-xs mt-2 text-right ${isUser ? 'text-white/70' : 'text-text-muted'}`}>
        {new Date(message.timestamp).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>
  );
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
}

export default function MessageList({ messages, isTyping }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const chat = useAppSelector((state) => state.chat);

  useEffect(() => {
    const scrollToBottom = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    };

    scrollToBottom();
  }, [messages, isTyping, chat.isStreaming]);

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-5 flex flex-col gap-4"
      style={{ minHeight: 0 }}
    >
      {messages.map((message, idx) => (
        <MessageBubble key={idx} message={message} />
      ))}

      {isTyping && (
        <div className="typing-indicator">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
