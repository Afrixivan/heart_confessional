import { useState } from 'react';
import { Card, Button, Progress, Row, Col, Result, message } from 'antd';
import {
  BarChartOutlined,
  CloudOutlined,
  ThunderboltOutlined,
  MoonOutlined,
  UserOutlined,
  StarOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import type { TestAnswer, TestResult } from '../types';

interface TestItem {
  test_id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  questionCount: number;
  duration: string;
}

const tests: TestItem[] = [
  {
    test_id: 'sas',
    title: '焦虑自评量表(SAS)',
    description: '用于评估焦虑症状的严重程度，包含20个题目，约5分钟完成。',
    category: '焦虑',
    icon: <BarChartOutlined />,
    questionCount: 20,
    duration: '5分钟',
  },
  {
    test_id: 'sds',
    title: '抑郁自评量表(SDS)',
    description: '用于评估抑郁症状的严重程度，包含20个题目，约5分钟完成。',
    category: '抑郁',
    icon: <CloudOutlined />,
    questionCount: 20,
    duration: '5分钟',
  },
  {
    test_id: 'stress',
    title: '压力水平测试',
    description: '评估当前的压力水平和应对能力，包含15个题目，约3分钟完成。',
    category: '压力',
    icon: <ThunderboltOutlined />,
    questionCount: 15,
    duration: '3分钟',
  },
  {
    test_id: 'sleep',
    title: '睡眠质量测试',
    description: '评估睡眠质量和睡眠障碍情况，包含10个题目，约2分钟完成。',
    category: '睡眠',
    icon: <MoonOutlined />,
    questionCount: 10,
    duration: '2分钟',
  },
  {
    test_id: 'personality',
    title: '性格类型测试',
    description: '基于MBTI理论的性格类型测试，帮助了解自己的性格特点。',
    category: '性格',
    icon: <UserOutlined />,
    questionCount: 40,
    duration: '10分钟',
  },
  {
    test_id: 'self-esteem',
    title: '自信心测试',
    description: '评估自信心水平和自我价值感，包含15个题目，约3分钟完成。',
    category: '性格',
    icon: <StarOutlined />,
    questionCount: 15,
    duration: '3分钟',
  },
];

// 模拟测试题目
const mockQuestions = [
  { question_id: '1', content: '最近一周，你是否经常感到紧张或焦虑？', options: ['没有或很少', '偶尔', '经常', '总是'] },
  { question_id: '2', content: '你是否觉得难以放松或休息？', options: ['没有或很少', '偶尔', '经常', '总是'] },
  { question_id: '3', content: '你是否容易感到疲劳或精力不足？', options: ['没有或很少', '偶尔', '经常', '总是'] },
  { question_id: '4', content: '你是否经常担心未来的事情？', options: ['没有或很少', '偶尔', '经常', '总是'] },
  { question_id: '5', content: '你是否觉得自己比平时更容易生气或烦躁？', options: ['没有或很少', '偶尔', '经常', '总是'] },
];

type TestStage = 'list' | 'question' | 'result';

export default function TestPage() {
  const [stage, setStage] = useState<TestStage>('list');
  const [currentTest, setCurrentTest] = useState<TestItem | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<TestResult | null>(null);

  const startTest = (test: TestItem) => {
    setCurrentTest(test);
    setStage('question');
    setCurrentQuestionIdx(0);
    setAnswers({});
    setResult(null);
  };

  const selectOption = (questionId: string, optionIdx: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleNext = () => {
    const currentQ = mockQuestions[currentQuestionIdx];
    if (answers[currentQ.question_id] === undefined) {
      message.warning('请先选择一个答案');
      return;
    }

    if (currentQuestionIdx < mockQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      // 计算结果
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      let level: string;
      let description: string;
      let suggestions: string[];

      if (totalScore <= 5) {
        level = '正常';
        description = '你的情绪状态良好，继续保持积极的生活态度！';
        suggestions = ['保持规律作息', '继续坚持运动', '保持社交活动'];
      } else if (totalScore <= 10) {
        level = '轻度焦虑';
        description = '你可能有一些轻微的焦虑情绪，可以尝试一些放松技巧来缓解。';
        suggestions = ['尝试深呼吸练习', '进行正念冥想', '培养兴趣爱好'];
      } else if (totalScore <= 15) {
        level = '中度焦虑';
        description = '你的焦虑情绪较为明显，建议采取积极的应对措施。';
        suggestions = ['寻求朋友家人的支持', '尝试写情绪日记', '考虑咨询专业人士'];
      } else {
        level = '重度焦虑';
        description = '你的焦虑情绪比较严重，建议尽快寻求专业帮助。';
        suggestions = ['联系心理咨询师', '拨打心理援助热线：400-161-9995', '与学校心理中心联系'];
      }

      setResult({
        result_id: 'mock-' + Date.now(),
        test_id: currentTest?.test_id || '',
        test_title: currentTest?.title || '',
        score: totalScore,
        level,
        description,
        suggestions,
        created_at: new Date().toISOString(),
      });
      setStage('result');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1);
    }
  };

  const handleRetry = () => {
    setStage('list');
    setCurrentTest(null);
    setAnswers({});
    setResult(null);
  };

  // 渲染测试列表
  if (stage === 'list') {
    return (
      <div className="py-10 px-4 sm:px-6 page-fade">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-2">心理测试</h2>
          <p className="text-text-secondary text-center mb-10">
            通过科学的心理量表，了解自己的心理状态
          </p>
          <Row gutter={[24, 24]}>
            {tests.map((test) => (
              <Col xs={24} sm={12} lg={8} key={test.test_id}>
                <Card
                  hoverable
                  className="card-hover h-full !rounded-lg !border-0 shadow-light"
                  styles={{ body: { padding: '30px' } }}
                >
                  <div className="w-14 h-14 rounded-lg gradient-card flex items-center justify-center text-3xl text-white mb-5">
                    {test.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2.5">{test.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {test.description}
                  </p>
                  <div className="flex gap-4 text-xs text-text-muted mb-5">
                    <span>📝 {test.questionCount}题</span>
                    <span>⏱️ {test.duration}</span>
                  </div>
                  <Button
                    type="primary"
                    block
                    className="!bg-primary !border-primary hover:!bg-primary-dark"
                    onClick={() => startTest(test)}
                  >
                    开始测试
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }

  // 渲染答题界面
  if (stage === 'question' && currentTest) {
    const currentQ = mockQuestions[currentQuestionIdx];
    const progress = ((currentQuestionIdx + 1) / mockQuestions.length) * 100;

    return (
      <div className="py-10 px-4 sm:px-6 page-fade">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">{currentTest.title}</h2>

          <Progress
            percent={progress}
            strokeColor="#FFB7C5"
            className="mb-8"
            format={() => `${currentQuestionIdx + 1} / ${mockQuestions.length}`}
          />

          <Card className="!rounded-lg !border-0 shadow-light mb-8" styles={{ body: { padding: '40px' } }}>
            <div className="text-sm text-primary font-semibold mb-4">
              第 {currentQuestionIdx + 1} / {mockQuestions.length} 题
            </div>
            <h3 className="text-lg font-semibold mb-8">{currentQ.content}</h3>
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => selectOption(currentQ.question_id, idx)}
                  className={`p-4 rounded-md border-2 cursor-pointer transition-all ${
                    answers[currentQ.question_id] === idx
                      ? 'border-primary bg-primary-light'
                      : 'border-border hover:border-primary hover:bg-background'
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </Card>

          <div className="flex justify-between items-center">
            <Button
              size="large"
              onClick={handlePrev}
              disabled={currentQuestionIdx === 0}
              className="!border-border"
            >
              上一题
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleNext}
              className="!bg-primary !border-primary hover:!bg-primary-dark"
            >
              {currentQuestionIdx === mockQuestions.length - 1 ? '提交测试' : '下一题'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 渲染结果界面
  if (stage === 'result' && result) {
    return (
      <div className="py-10 px-4 sm:px-6 page-fade">
        <div className="max-w-2xl mx-auto">
          <Card className="!rounded-lg !border-0 shadow-light" styles={{ body: { padding: '40px' } }}>
            <Result
              icon={<CheckCircleOutlined className="text-secondary-green" />}
              status="success"
              title={
                <div>
                  <div className="text-5xl font-bold text-primary-dark mb-2">
                    {result.score}分
                  </div>
                  <div className="text-xl font-semibold">{result.level}</div>
                </div>
              }
              subTitle={
                <p className="text-text-secondary leading-relaxed mt-4">
                  {result.description}
                </p>
              }
              extra={
                <div className="text-left bg-background rounded-md p-5 mb-5">
                  <h4 className="font-semibold mb-3">💡 建议：</h4>
                  <ul className="space-y-2">
                    {result.suggestions.map((suggestion, idx) => (
                      <li
                        key={idx}
                        className="text-text-secondary pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-secondary-green"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              }
            />
            <div className="text-center">
              <Button
                type="primary"
                size="large"
                onClick={handleRetry}
                className="!bg-primary !border-primary hover:!bg-primary-dark"
              >
                返回测试列表
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}
