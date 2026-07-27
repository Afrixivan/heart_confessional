import { useState, useRef, KeyboardEvent } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, PaperClipOutlined, SmileOutlined } from '@ant-design/icons';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<{ focus: () => void; resizableTextArea?: { textArea: HTMLTextAreaElement } }>(null);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    // 重置输入框高度
    if (inputRef.current?.resizableTextArea?.textArea) {
      inputRef.current.resizableTextArea.textArea.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-5 bg-white border-t border-border">
      <div className="flex gap-2 items-end bg-background rounded-lg p-2.5 border-2 border-border focus-within:border-primary transition-colors">
        <Button
          type="text"
          icon={<SmileOutlined />}
          className="text-text-muted hover:text-primary"
          size="large"
        />
        <Button
          type="text"
          icon={<PaperClipOutlined />}
          className="text-text-muted hover:text-primary"
          size="large"
        />
        <Input.TextArea
          ref={inputRef as never}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入你想说的话..."
          autoSize={{ minRows: 1, maxRows: 5 }}
          variant="borderless"
          className="flex-1 !bg-transparent !text-[15px]"
        />
        <Button
          type="primary"
          shape="circle"
          icon={<SendOutlined />}
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="!bg-primary !border-primary hover:!bg-primary-dark flex-shrink-0"
          size="large"
        />
      </div>
      <div className="text-xs text-text-muted mt-2 text-center">
        按 Enter 发送，Shift + Enter 换行
      </div>
    </div>
  );
}
