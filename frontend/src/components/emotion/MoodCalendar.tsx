import { useState } from 'react';
import { Card, Button, Modal, Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { EMOTION_MAP } from '../../constants';
import type { EmotionType } from '../../types';

const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

export default function MoodCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // 模拟情绪数据
  const moodData: Record<number, EmotionType> = {
    1: 'happy', 3: 'anxious', 5: 'sad', 7: 'happy',
    10: 'angry', 12: 'neutral', 14: 'happy', 15: 'sad',
    17: 'anxious', 19: 'happy', 21: 'neutral', 23: 'happy',
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (day: number) => {
    setSelectedDay(day);
    setModalOpen(true);
  };

  return (
    <Card className="!rounded-lg !border-0 shadow-light mb-8" styles={{ body: { padding: '30px' } }}>
      <div className="flex justify-between items-center mb-5">
        <Button
          shape="circle"
          icon={<LeftOutlined />}
          onClick={handlePrevMonth}
          className="!border-border hover:!border-primary"
        />
        <h3 className="text-lg font-semibold">
          {year}年{month + 1}月
        </h3>
        <Button
          shape="circle"
          icon={<RightOutlined />}
          onClick={handleNextMonth}
          className="!border-border hover:!border-primary"
        />
      </div>

      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center font-semibold text-text-secondary py-2.5">
            {day}
          </div>
        ))}

        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} />
        ))}

        {Array.from({ length: daysInMonth }).map((_, idx) => {
          const day = idx + 1;
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();
          const mood = moodData[day];
          const moodInfo = mood ? EMOTION_MAP[mood] : null;

          return (
            <div
              key={day}
              onClick={() => handleDayClick(day)}
              className={`aspect-square flex flex-col items-center justify-center rounded-md cursor-pointer transition-all hover:bg-background relative ${
                isToday ? 'bg-primary text-white font-semibold' : ''
              }`}
            >
              <span className="text-sm">{day}</span>
              {moodInfo && !isToday && (
                <span
                  className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: moodInfo.color }}
                />
              )}
            </div>
          );
        })}
      </div>

      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={selectedDay ? `${month + 1}月${selectedDay}日 心情记录` : ''}
        footer={null}
        centered
      >
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-2 text-sm">今日心情</label>
            <div className="flex gap-3">
              {Object.entries(EMOTION_MAP).map(([key, info]) => (
                <Button
                  key={key}
                  shape="circle"
                  size="large"
                  className="!text-2xl"
                  style={{
                    backgroundColor: info.color + '40',
                    border: `2px solid ${info.color}`,
                  }}
                >
                  {info.emoji}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-2 text-sm">心情记录</label>
            <Input.TextArea
              placeholder="记录一下今天的心情..."
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </div>
          <div className="flex gap-3 justify-end">
            <Button onClick={() => setModalOpen(false)}>取消</Button>
            <Button
              type="primary"
              className="!bg-primary !border-primary"
              onClick={() => setModalOpen(false)}
            >
              保存
            </Button>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
