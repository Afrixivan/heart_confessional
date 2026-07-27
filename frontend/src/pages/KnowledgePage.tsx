import { useState, useMemo } from 'react';
import { Card, Input, Button, Row, Col, Modal, Tag, Empty } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { KNOWLEDGE_CATEGORIES } from '../constants';
import type { Knowledge } from '../types';

// 模拟知识库数据
const mockKnowledge: Knowledge[] = [
  {
    knowledge_id: '1',
    title: '认知行为疗法',
    concept: '认知行为疗法（CBT）是一种通过改变思维和行为来改善情绪的心理治疗方法。它认为我们的情绪不是由事件本身引起的，而是由我们对事件的看法和解释引起的。',
    scenarios: ['考试焦虑', '社交恐惧', '抑郁情绪'],
    techniques: ['识别自动负面思维', '挑战不合理信念', '用理性思维替代', '通过行为实验验证'],
    tips: 'CBT需要持续练习，建议每天花10-15分钟进行思维记录。',
    category: 'anxiety',
    keywords: ['CBT', '认知重构', '思维'],
  },
  {
    knowledge_id: '2',
    title: '时间管理四象限',
    concept: '时间管理四象限是一种帮助我们合理分配时间的方法，将任务分为重要紧急、重要不紧急、紧急不重要、不紧急不重要四个象限，优先处理重要不紧急的任务。',
    scenarios: ['学业压力', '工作效率低', '拖延症'],
    techniques: ['每天花10分钟规划任务', '优先处理重要不紧急的任务', '学会拒绝不重要的任务', '定期复盘时间使用情况'],
    tips: '建议使用 Eisenhower 矩阵工具进行任务分类。',
    category: 'stress',
    keywords: ['时间管理', '优先级', '效率'],
  },
  {
    knowledge_id: '3',
    title: '有效沟通技巧',
    concept: '有效沟通不仅是表达自己，更是倾听他人。运用"我"语句表达感受，积极倾听对方的观点，有助于建立健康的人际关系。',
    scenarios: ['室友矛盾', '恋爱关系', '家庭沟通'],
    techniques: ['使用"我"语句表达感受', '积极倾听，不打断对方', '保持眼神交流和开放姿态', '给予对方反馈确认理解'],
    tips: '避免使用"你总是..."这样的绝对化表达，会让人感到被攻击。',
    category: 'relationship',
    keywords: ['沟通', '倾听', '表达'],
  },
  {
    knowledge_id: '4',
    title: '正念冥想',
    concept: '正念冥想是一种通过关注当下、接纳情绪来达到内心平静的练习方法。它帮助我们不被情绪所控制，而是以旁观者的角度观察情绪的变化。',
    scenarios: ['焦虑情绪', '失眠', '注意力不集中'],
    techniques: ['每天练习10-15分钟', '专注于呼吸或身体感受', '当思绪飘走时温柔拉回', '不评判自己的任何想法'],
    tips: '初学者可以从每天5分钟开始，逐渐增加时长。',
    category: 'emotion',
    keywords: ['正念', '冥想', '放松'],
  },
  {
    knowledge_id: '5',
    title: '成长型思维',
    concept: '成长型思维认为能力是可以通过努力和学习来发展的，而不是固定不变的。拥有成长型思维的人更愿意接受挑战，从失败中学习，持续进步。',
    scenarios: ['学习困难', '失败挫折', '自我怀疑'],
    techniques: ['把挑战看作成长的机会', '关注努力的过程而非结果', '从批评中寻找改进的方向', '用"还没"代替"不能"'],
    tips: '改变思维方式需要时间，对自己保持耐心。',
    category: 'growth',
    keywords: ['成长', '思维模式', '学习'],
  },
  {
    knowledge_id: '6',
    title: '睡眠与心理健康',
    concept: '良好的睡眠对心理健康至关重要。睡眠不足会影响情绪调节能力、认知功能和免疫系统。建立规律的睡眠习惯是保持心理健康的基础。',
    scenarios: ['失眠', '睡眠质量差', '白天疲倦'],
    techniques: ['保持规律的作息时间', '睡前1小时远离电子设备', '建立放松的睡前仪式', '保持卧室黑暗、安静、凉爽'],
    tips: '成年人每天需要7-9小时的睡眠。',
    category: 'stress',
    keywords: ['睡眠', '健康', '作息'],
  },
];

const categoryIconMap: Record<string, string> = {
  anxiety: '📌',
  stress: '🎯',
  relationship: '❤️',
  emotion: '🌊',
  growth: '🌱',
};

export default function KnowledgePage() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedKnowledge, setSelectedKnowledge] = useState<Knowledge | null>(null);

  const filteredKnowledge = useMemo(() => {
    return mockKnowledge.filter((item) => {
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchKeyword =
        !searchKeyword ||
        item.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.concept.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        item.keywords?.some((k) => k.toLowerCase().includes(searchKeyword.toLowerCase()));
      return matchCategory && matchKeyword;
    });
  }, [searchKeyword, activeCategory]);

  return (
    <div className="py-10 px-4 sm:px-6 page-fade">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">心理知识</h2>
        <p className="text-text-secondary text-center mb-10">
          科学的心理学知识，帮助你更好地了解自己
        </p>

        {/* 搜索栏 */}
        <div className="max-w-2xl mx-auto mb-10">
          <Input
            size="large"
            placeholder="搜索心理知识..."
            prefix={<SearchOutlined className="text-text-muted" />}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="!rounded-full !border-2 !border-border focus:!border-primary"
          />
        </div>

        {/* 分类标签 */}
        <div className="flex gap-2.5 justify-center mb-8 flex-wrap">
          {KNOWLEDGE_CATEGORIES.map((cat) => (
            <Button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`!rounded-full !px-5 ${
                activeCategory === cat.key
                  ? '!bg-primary !text-white !border-primary'
                  : '!bg-white !text-text-secondary !border-border hover:!border-primary'
              }`}
            >
              {cat.label}
            </Button>
          ))}
        </div>

        {/* 知识卡片列表 */}
        {filteredKnowledge.length === 0 ? (
          <Empty description="暂无相关知识" className="py-16" />
        ) : (
          <Row gutter={[24, 24]}>
            {filteredKnowledge.map((knowledge) => (
              <Col xs={24} sm={12} lg={8} key={knowledge.knowledge_id}>
                <Card
                  hoverable
                  className="card-hover h-full !rounded-lg !border-0 shadow-light cursor-pointer"
                  styles={{ body: { padding: '24px' } }}
                  onClick={() => setSelectedKnowledge(knowledge)}
                >
                  <div className="flex gap-3 mb-4">
                    <div className="w-12 h-12 rounded-md gradient-card flex items-center justify-center text-xl flex-shrink-0">
                      {categoryIconMap[knowledge.category] || '📚'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-primary font-medium">
                        {KNOWLEDGE_CATEGORIES.find((c) => c.key === knowledge.category)?.label}
                      </div>
                      <h3 className="text-base font-semibold mt-1">{knowledge.title}</h3>
                    </div>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                    {knowledge.concept}
                  </p>

                  <div className="bg-background rounded-md p-3.5">
                    <h4 className="text-sm font-semibold mb-2">💡 实用技巧</h4>
                    <ul className="space-y-1">
                      {knowledge.techniques.slice(0, 3).map((tech, idx) => (
                        <li
                          key={idx}
                          className="text-[13px] text-text-secondary pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* 知识详情模态框 */}
        <Modal
          open={!!selectedKnowledge}
          onCancel={() => setSelectedKnowledge(null)}
          footer={null}
          width={640}
          centered
        >
          {selectedKnowledge && (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-md gradient-card flex items-center justify-center text-2xl">
                  {categoryIconMap[selectedKnowledge.category] || '📚'}
                </div>
                <div>
                  <Tag color="pink">
                    {KNOWLEDGE_CATEGORIES.find((c) => c.key === selectedKnowledge.category)?.label}
                  </Tag>
                  <h2 className="text-xl font-semibold mt-1">{selectedKnowledge.title}</h2>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">【核心概念】</h4>
                <p className="text-text-secondary leading-relaxed">{selectedKnowledge.concept}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">【常见场景】</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedKnowledge.scenarios.map((scene, idx) => (
                    <Tag key={idx} className="!bg-background">
                      {scene}
                    </Tag>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">【实用技巧】</h4>
                <ol className="list-decimal list-inside space-y-1 text-text-secondary">
                  {selectedKnowledge.techniques.map((tech, idx) => (
                    <li key={idx}>{tech}</li>
                  ))}
                </ol>
              </div>

              <div className="bg-background rounded-md p-4">
                <h4 className="font-semibold mb-2">【温馨提示】</h4>
                <p className="text-text-secondary text-sm">{selectedKnowledge.tips}</p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
