import { useState, useMemo } from 'react';
import { Card, Button, Row, Col, Modal, Form, Input, Select, message, Empty } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EMOTION_MAP, DIARY_CATEGORIES } from '../constants';
import type { Diary, EmotionType } from '../types';

// 模拟日记数据
const mockDiaries: Diary[] = [
  {
    diary_id: '1',
    title: '今天收到了offer！',
    content: '今天收到了心仪公司的实习offer，真的太开心了！从投递简历到面试，经历了很多波折，终于有了回报。感谢这段时间努力的自己，也感谢朋友们的鼓励和支持。接下来要好好准备实习，争取学到更多东西！',
    emotion_tag: 'happy',
    category: 'daily',
    created_at: '2026-07-17',
    updated_at: '2026-07-17',
  },
  {
    diary_id: '2',
    title: '期末复习压力好大',
    content: '还有两周就要期末考试了，但是感觉很多东西都还没复习完。高数、线代、专业课...每一门都很难。晚上睡不着，白天学不进去，这种感觉太难受了。真的很担心自己考不好，对不起父母的期望。',
    emotion_tag: 'anxious',
    category: 'study',
    created_at: '2026-07-16',
    updated_at: '2026-07-16',
  },
  {
    diary_id: '3',
    title: '和室友吵架了',
    content: '今天和室友因为一点小事吵架了，其实也不是什么大问题，但当时就是控制不住情绪。现在冷静下来想想，觉得很后悔。我们在一起住了两年，一直相处得很好，不应该因为这点小事影响感情。明天找个机会好好聊聊吧。',
    emotion_tag: 'sad',
    category: 'relationship',
    created_at: '2026-07-15',
    updated_at: '2026-07-15',
  },
  {
    diary_id: '4',
    title: '平淡的一天',
    content: '今天过得很平淡，上课、自习、吃饭、睡觉，和往常一样。虽然没有什么特别的事情发生，但这种平静的感觉也挺好的。有时候不需要太多波澜，平平淡淡也是一种幸福。',
    emotion_tag: 'neutral',
    category: 'emotion',
    created_at: '2026-07-14',
    updated_at: '2026-07-14',
  },
  {
    diary_id: '5',
    title: '和朋友们去野餐',
    content: '今天天气很好，和几个好朋友一起去公园野餐了。我们带了很多好吃的，聊了很多开心的话题。看着蓝天白云，吃着美食，和朋友们在一起，真的很幸福。这种简单的快乐，希望能一直保持下去。',
    emotion_tag: 'happy',
    category: 'daily',
    created_at: '2026-07-13',
    updated_at: '2026-07-13',
  },
  {
    diary_id: '6',
    title: '被放鸽子了',
    content: '今天本来约好了和朋友一起去看电影，我提前半小时就到了电影院，结果朋友说临时有事来不了了。我真的很生气，明明昨天还确认过的，为什么不早点告诉我？白白浪费了我一下午的时间，现在心情特别差。',
    emotion_tag: 'angry',
    category: 'relationship',
    created_at: '2026-07-12',
    updated_at: '2026-07-12',
  },
];

const emotionFilters = [
  { key: 'all', label: '全部' },
  { key: 'happy', label: '开心' },
  { key: 'sad', label: '难过' },
  { key: 'anxious', label: '焦虑' },
  { key: 'angry', label: '生气' },
  { key: 'neutral', label: '平静' },
];

export default function DiaryPage() {
  const [diaries, setDiaries] = useState<Diary[]>(mockDiaries);
  const [activeEmotion, setActiveEmotion] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailDiary, setDetailDiary] = useState<Diary | null>(null);
  const [form] = Form.useForm();

  const filteredDiaries = useMemo(() => {
    if (activeEmotion === 'all') return diaries;
    return diaries.filter((d) => d.emotion_tag === activeEmotion);
  }, [diaries, activeEmotion]);

  const handleAddDiary = () => {
    form.resetFields();
    setModalOpen(true);
  };

  const handleSubmitDiary = async () => {
    try {
      const values = await form.validateFields();
      const newDiary: Diary = {
        diary_id: 'new-' + Date.now(),
        title: values.title,
        content: values.content,
        emotion_tag: values.emotion_tag as EmotionType,
        category: values.category,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0],
      };
      setDiaries([newDiary, ...diaries]);
      setModalOpen(false);
      message.success('日记已保存');
    } catch {
      // 表单验证失败
    }
  };

  const getCategoryLabel = (key: string) => {
    return DIARY_CATEGORIES.find((c) => c.key === key)?.label || key;
  };

  return (
    <div className="py-10 px-4 sm:px-6 page-fade">
      <div className="max-w-7xl mx-auto">
        {/* 头部 */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl font-bold">情绪日记</h2>
            <p className="text-text-secondary mt-1">记录心情，见证成长</p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddDiary}
            className="!bg-primary !border-primary hover:!bg-primary-dark"
          >
            写日记
          </Button>
        </div>

        {/* 情绪分类筛选 */}
        <div className="flex gap-2.5 mb-8 flex-wrap">
          {emotionFilters.map((filter) => (
            <Button
              key={filter.key}
              onClick={() => setActiveEmotion(filter.key)}
              className={`!rounded-full !px-5 ${
                activeEmotion === filter.key
                  ? '!bg-primary !text-white !border-primary'
                  : '!bg-white !text-text-secondary !border-border hover:!border-primary'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* 日记列表 */}
        {filteredDiaries.length === 0 ? (
          <Empty description="暂无日记记录" className="py-16" />
        ) : (
          <Row gutter={[24, 24]}>
            {filteredDiaries.map((diary) => {
              const emotionInfo = EMOTION_MAP[diary.emotion_tag];
              return (
                <Col xs={24} sm={12} lg={8} key={diary.diary_id}>
                  <Card
                    hoverable
                    className="card-hover h-full !rounded-lg !border-0 shadow-light cursor-pointer"
                    styles={{ body: { padding: '24px' } }}
                    onClick={() => setDetailDiary(diary)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${emotionInfo.bgClass} ${emotionInfo.textClass}`}
                      >
                        {emotionInfo.emoji} {emotionInfo.label}
                      </span>
                      <span className="text-xs text-text-muted">{diary.created_at}</span>
                    </div>
                    <h3 className="text-base font-semibold mb-2.5">{diary.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
                      {diary.content}
                    </p>
                    <div className="mt-4 text-xs text-text-muted">
                      {getCategoryLabel(diary.category)}
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        {/* 新增/编辑日记模态框 */}
        <Modal
          open={modalOpen}
          title="写日记"
          onCancel={() => setModalOpen(false)}
          onOk={handleSubmitDiary}
          okText="保存日记"
          cancelText="取消"
          width={560}
          centered
          okButtonProps={{ className: '!bg-primary !border-primary' }}
        >
          <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item
              name="title"
              label="标题"
              rules={[{ required: true, message: '请输入日记标题' }]}
            >
              <Input placeholder="给日记起个标题..." size="large" />
            </Form.Item>
            <Form.Item
              name="emotion_tag"
              label="心情标签"
              rules={[{ required: true, message: '请选择心情' }]}
            >
              <Select size="large" placeholder="选择心情">
                {Object.entries(EMOTION_MAP).map(([key, info]) => (
                  <Select.Option key={key} value={key}>
                    {info.emoji} {info.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              label="分类"
              rules={[{ required: true, message: '请选择分类' }]}
            >
              <Select size="large" placeholder="选择分类">
                {DIARY_CATEGORIES.map((cat) => (
                  <Select.Option key={cat.key} value={cat.key}>
                    {cat.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="content"
              label="内容"
              rules={[{ required: true, message: '请输入日记内容' }]}
            >
              <Input.TextArea
                placeholder="记录今天的心情..."
                autoSize={{ minRows: 5, maxRows: 12 }}
                size="large"
              />
            </Form.Item>
          </Form>
        </Modal>

        {/* 日记详情模态框 */}
        <Modal
          open={!!detailDiary}
          onCancel={() => setDetailDiary(null)}
          footer={null}
          width={640}
          centered
        >
          {detailDiary && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{detailDiary.title}</h2>
              <div className="flex gap-3 items-center">
                {(() => {
                  const info = EMOTION_MAP[detailDiary.emotion_tag];
                  return (
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${info.bgClass} ${info.textClass}`}>
                      {info.emoji} {info.label}
                    </span>
                  );
                })()}
                <span className="text-xs text-text-muted">{detailDiary.created_at}</span>
                <span className="text-xs text-text-muted">·</span>
                <span className="text-xs text-text-muted">
                  {getCategoryLabel(detailDiary.category)}
                </span>
              </div>
              <div className="text-text-secondary leading-loose whitespace-pre-wrap">
                {detailDiary.content}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
