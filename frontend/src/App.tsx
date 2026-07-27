import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider, Spin, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import AppLayout from './components/layout/AppLayout';
import { ROUTES } from './constants';

// 路由懒加载 - 性能优化（React Best Practices: 代码分割）
const HomePage = lazy(() => import('./pages/HomePage'));
const ChatPage = lazy(() => import('./pages/ChatPage'));
const EmotionPage = lazy(() => import('./pages/EmotionPage'));
const KnowledgePage = lazy(() => import('./pages/KnowledgePage'));
const TestPage = lazy(() => import('./pages/TestPage'));
const DiaryPage = lazy(() => import('./pages/DiaryPage'));
const BreathingPage = lazy(() => import('./pages/BreathingPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

// 加载占位组件
const PageLoading = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
    <Spin size="large" />
    <span className="text-text-muted">加载中...</span>
  </div>
);

// 自定义主题
const theme = {
  token: {
    colorPrimary: '#FFB7C5',
    colorInfo: '#FFB7C5',
    colorLink: '#FF8BA3',
    borderRadius: 12,
    fontFamily: "'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
  },
};

export default function App() {
  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <AntdApp>
        <BrowserRouter>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path={ROUTES.HOME} element={<HomePage />} />
                <Route path={ROUTES.CHAT} element={<ChatPage />} />
                <Route path={ROUTES.EMOTION} element={<EmotionPage />} />
                <Route path={ROUTES.KNOWLEDGE} element={<KnowledgePage />} />
                <Route path={ROUTES.TEST} element={<TestPage />} />
                <Route path={ROUTES.DIARY} element={<DiaryPage />} />
                <Route path={ROUTES.BREATHING} element={<BreathingPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AntdApp>
    </ConfigProvider>
  );
}
