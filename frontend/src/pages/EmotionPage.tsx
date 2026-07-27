import { useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import EmotionTrendChart from '../components/emotion/EmotionTrendChart';
import EmotionRadarChart from '../components/emotion/EmotionRadarChart';
import MoodCalendar from '../components/emotion/MoodCalendar';

const timeRanges = [
  { key: 'week', label: '本周' },
  { key: 'month', label: '本月' },
  { key: 'quarter', label: '近3个月' },
  { key: 'custom', label: '自定义' },
];

const reportData = {
  totalRecords: 15,
  avgScore: 6.2,
  keyFindings: [
    '焦虑情绪在周三、周四达到高峰，可能与期末考试临近有关',
    '压力指数整体偏高，建议合理安排学习计划，避免过度劳累',
    '积极情绪在周末有所回升，说明休息和娱乐对情绪调节有帮助',
    '情绪波动较大，建议尝试情绪日记记录，更好地了解情绪变化规律',
  ],
  suggestions: [
    '🎯 每天安排30分钟的放松时间，可以尝试呼吸练习或正念冥想',
    '📝 坚持写情绪日记，记录每天的情绪变化和触发事件',
    '👥 适当与朋友或家人交流，不要独自承担所有压力',
    '💤 保证每天7-8小时的睡眠，这对情绪稳定非常重要',
    '🌳 每周安排一次户外活动，接触大自然有助于缓解压力',
  ],
};

export default function EmotionPage() {
  const [activeRange, setActiveRange] = useState('week');

  return (
    <div className="py-10 px-4 sm:px-6 page-fade">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">情绪分析</h2>
        <p className="text-text-secondary text-center mb-10">
          了解你的情绪变化，洞察内心世界
        </p>

        {/* 时间范围选择 */}
        <div className="flex gap-2.5 mb-8 justify-center flex-wrap">
          {timeRanges.map((range) => (
            <Button
              key={range.key}
              onClick={() => setActiveRange(range.key)}
              className={`!rounded-full !px-6 ${
                activeRange === range.key
                  ? '!bg-primary !text-white !border-primary'
                  : '!bg-white !text-text-secondary !border-border hover:!border-primary'
              }`}
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* 图表区域 */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} lg={12}>
            <EmotionTrendChart />
          </Col>
          <Col xs={24} lg={12}>
            <EmotionRadarChart />
          </Col>
        </Row>

        {/* 心情日历 */}
        <MoodCalendar />

        {/* 情绪分析报告 */}
        <Card className="!rounded-lg !border-0 shadow-light" styles={{ body: { padding: '30px' } }}>
          <h3 className="text-xl font-semibold mb-5">📋 情绪分析报告</h3>

          <div className="mb-6">
            <h4 className="text-base font-semibold mb-3 text-text-secondary">📊 总体情况</h4>
            <p className="text-text-secondary leading-relaxed">
              本周共记录 <strong className="text-primary-dark">{reportData.totalRecords}</strong> 条情绪记录，平均情绪指数为{' '}
              <strong className="text-primary-dark">{reportData.avgScore}</strong>。整体情绪状态处于中等水平，建议适当进行放松练习。
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-base font-semibold mb-3 text-text-secondary">🔑 关键发现</h4>
            <ul className="space-y-0">
              {reportData.keyFindings.map((finding, idx) => (
                <li
                  key={idx}
                  className="py-2 border-b border-border last:border-0 text-text-secondary"
                >
                  {finding}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-semibold mb-3 text-text-secondary">💡 成长建议</h4>
            <ul className="space-y-0">
              {reportData.suggestions.map((suggestion, idx) => (
                <li
                  key={idx}
                  className="py-2 border-b border-border last:border-0 text-text-secondary"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
