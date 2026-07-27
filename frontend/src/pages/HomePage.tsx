import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col } from 'antd';
import {
  MessageOutlined,
  BulbOutlined,
  LineChartOutlined,
  EditOutlined,
  BookOutlined,
  ExperimentOutlined,
  CloudOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants';

const features = [
  {
    icon: <MessageOutlined />,
    title: '对话陪伴',
    description: '安全私密的情绪宣泄空间，通过共情倾听和引导性回应帮助你梳理情绪，支持多轮对话上下文管理',
    color: 'gradient-primary',
    route: ROUTES.CHAT,
  },
  {
    icon: <BulbOutlined />,
    title: 'CBT引导',
    description: '基于认知行为疗法提供结构化心理引导，帮助识别和改变负面思维模式，包含标准化心理量表评估',
    color: 'gradient-card',
    route: ROUTES.CHAT,
  },
  {
    icon: <LineChartOutlined />,
    title: '情绪追踪',
    description: '记录情绪状态，生成周期性分析报告，帮助了解自身情绪变化趋势，包含情绪趋势图表和心情日历',
    color: 'gradient-primary',
    route: ROUTES.EMOTION,
  },
  {
    icon: <EditOutlined />,
    title: '情绪日记',
    description: '基于对话内容自动生成情绪日记，减轻记录负担，支持日记分类管理和搜索功能',
    color: 'gradient-card',
    route: ROUTES.DIARY,
  },
  {
    icon: <BookOutlined />,
    title: '心理知识',
    description: '通过RAG知识库检索提供科学易懂的心理学知识，包含知识卡片展示和话题关键词检索',
    color: 'gradient-primary',
    route: ROUTES.KNOWLEDGE,
  },
  {
    icon: <ExperimentOutlined />,
    title: '心理测试',
    description: '提供标准化心理量表评估，包括焦虑自评量表SAS、抑郁自评量表SDS等',
    color: 'gradient-card',
    route: ROUTES.TEST,
  },
];

const relaxFeatures = [
  {
    icon: '🌬️',
    title: '呼吸练习',
    description: '4-7-8呼吸法，帮助快速放松身心',
    route: ROUTES.BREATHING,
  },
  {
    icon: '🧘',
    title: '正念冥想',
    description: '引导式冥想练习，提升专注力',
    route: ROUTES.BREATHING,
  },
  {
    icon: '🎵',
    title: '白噪音',
    description: '多种自然声音，营造舒适环境',
    route: ROUTES.BREATHING,
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page-fade">
      {/* Hero 区域 */}
      <section className="gradient-primary py-16 sm:py-20 text-center text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5">心灵树洞</h1>
          <p className="text-lg sm:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            为大学生提供7×24小时的情绪倾诉陪伴与成长支持💝
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button
              size="large"
              className="!bg-white !text-primary !border-white hover:!bg-primary-light"
              onClick={() => navigate(ROUTES.CHAT)}
            >
              开始对话
            </Button>
            <Button
              size="large"
              ghost
              className="!border-white !text-white hover:!bg-white/20"
              onClick={() => navigate(ROUTES.KNOWLEDGE)}
            >
              了解更多
            </Button>
          </div>
        </div>
      </section>

      {/* 核心功能 */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-2">核心功能</h2>
          <p className="text-text-secondary text-center mb-12">
            专注于大学生心理健康，提供专业温暖的支持
          </p>
          <Row gutter={[24, 24]}>
            {features.map((feature, idx) => (
              <Col xs={24} sm={12} lg={8} key={idx}>
                <Card
                  hoverable
                  className="card-hover h-full !rounded-lg !border-0 shadow-light cursor-pointer text-center"
                  styles={{ body: { padding: '40px 24px' } }}
                  onClick={() => navigate(feature.route)}
                >
                  <div
                    className={`w-20 h-20 mx-auto mb-5 rounded-lg flex items-center justify-center text-4xl text-white ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 放松练习 */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-center mb-2">放松练习</h2>
          <p className="text-text-secondary text-center mb-12">
            通过简单的练习帮助你放松身心
          </p>
          <Row gutter={[24, 24]}>
            {relaxFeatures.map((feature, idx) => (
              <Col xs={24} sm={8} key={idx}>
                <Card
                  hoverable
                  className="card-hover h-full !rounded-lg !border-0 shadow-light cursor-pointer text-center"
                  styles={{ body: { padding: '32px 24px' } }}
                  onClick={() => navigate(feature.route)}
                >
                  <div className="w-20 h-20 mx-auto mb-5 rounded-lg gradient-green flex items-center justify-center text-4xl">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary text-sm">{feature.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 紧急资源提示 */}
      <section className="py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Card className="!rounded-lg !border-primary-light !bg-primary-light/30">
            <div className="flex items-start gap-4">
              <div className="text-3xl">🆘</div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2 text-primary-dark">紧急心理援助</h3>
                <p className="text-text-secondary text-sm mb-3">
                  如果你正在经历心理危机，请立即寻求专业帮助。你并不孤单，有人愿意倾听并支持你。
                </p>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-3 py-1 bg-white rounded-full">
                    📞 全国24小时心理援助热线：<strong className="text-primary-dark">400-161-9995</strong>
                  </span>
                  <span className="px-3 py-1 bg-white rounded-full">
                    📞 青少年心理援助全国统一热线：<strong className="text-primary-dark">12355</strong>
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
