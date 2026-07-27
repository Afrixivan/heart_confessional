import ReactECharts from 'echarts-for-react';
import { Card } from 'antd';

const categories = ['焦虑', '抑郁', '压力', '快乐', '平静', '活力'];
const defaultData = [6, 4, 7, 5, 5, 4];

interface RadarChartProps {
  data?: number[];
}

export default function EmotionRadarChart({ data = defaultData }: RadarChartProps) {
  const option = {
    tooltip: {},
    radar: {
      indicator: categories.map((name) => ({ name, max: 10 })),
      shape: 'polygon',
      splitNumber: 5,
      axisName: { color: '#666', fontSize: 12 },
      splitLine: { lineStyle: { color: '#FFE4E9' } },
      splitArea: { areaStyle: { color: ['rgba(255, 183, 197, 0.05)', 'rgba(255, 183, 197, 0.1)'] } },
      axisLine: { lineStyle: { color: '#FFE4E9' } },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: data,
            name: '情绪分布',
            areaStyle: { color: 'rgba(255, 183, 197, 0.3)' },
            lineStyle: { color: '#FFB7C5', width: 2 },
            itemStyle: { color: '#FF8BA3' },
          },
        ],
      },
    ],
  };

  return (
    <Card className="!rounded-lg !border-0 shadow-light" styles={{ body: { padding: '24px' } }}>
      <h3 className="text-lg font-semibold mb-5">情绪雷达图</h3>
      <div style={{ height: 300 }}>
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </Card>
  );
}
