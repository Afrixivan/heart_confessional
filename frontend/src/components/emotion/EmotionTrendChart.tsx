import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';

interface TrendChartProps {
  data?: Array<{ date: string; value: number }>;
}

const defaultData = [
  { date: '周一', value: 6 },
  { date: '周二', value: 5 },
  { date: '周三', value: 7 },
  { date: '周四', value: 4 },
  { date: '周五', value: 6 },
  { date: '周六', value: 8 },
  { date: '周日', value: 5 },
];

export default function EmotionTrendChart({ data = defaultData }: TrendChartProps) {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: { left: '5%', right: '5%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.date),
      axisLine: { lineStyle: { color: '#FFE4E9' } },
      axisLabel: { color: '#666' },
    },
    yAxis: {
      type: 'value',
      max: 10,
      min: 0,
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#999' },
      splitLine: { lineStyle: { color: '#FFE4E9' } },
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
        barWidth: '40%',
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#FFB7C5' },
              { offset: 1, color: '#FF8BA3' },
            ],
          },
        },
      },
    ],
  };

  return (
    <Card className="!rounded-lg !border-0 shadow-light" styles={{ body: { padding: '24px' } }}>
      <h3 className="text-lg font-semibold mb-5">情绪趋势</h3>
      <div style={{ height: 300 }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </Card>
  );
}
