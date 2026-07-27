import { useState } from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AuthModal from '../auth/AuthModal';

const { Header, Content, Footer } = Layout;

export default function AppLayout() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  return (
    <Layout className="min-h-screen flex flex-col">
      <Header className="gradient-primary px-4 sm:px-6 sticky top-0 z-50 flex items-center" style={{ height: '64px', padding: 0 }}>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <AppHeader onOpenAuth={openAuth} />
        </div>
      </Header>
      <Content className="flex-1 bg-background">
        <div className="page-fade h-full">
          <Outlet />
        </div>
      </Content>
      <Footer className="bg-text-primary text-white" style={{ padding: 0 }}>
        <AppFooter />
      </Footer>
      <AuthModal
        open={authModalOpen}
        mode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </Layout>
  );
}
