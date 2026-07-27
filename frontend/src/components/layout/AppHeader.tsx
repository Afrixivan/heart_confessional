import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar, Button, Dropdown } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearCredentials } from '../../store/slices/authSlice';
import { ROUTES } from '../../constants';

interface AppHeaderProps {
  onOpenAuth: (mode: 'login' | 'register') => void;
}

const navItems = [
  { path: ROUTES.HOME, label: '首页' },
  { path: ROUTES.CHAT, label: '对话陪伴' },
  { path: ROUTES.EMOTION, label: '情绪分析' },
  { path: ROUTES.KNOWLEDGE, label: '心理知识' },
  { path: ROUTES.TEST, label: '心理测试' },
  { path: ROUTES.DIARY, label: '情绪日记' },
  { path: ROUTES.BREATHING, label: '呼吸练习' },
];

export default function AppHeader({ onOpenAuth }: AppHeaderProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate(ROUTES.HOME);
  };

  const dropdownItems = {
    items: [
      {
        key: 'profile',
        icon: <UserOutlined />,
        label: '个人中心',
      },
      {
        key: 'logout',
        icon: <LogoutOutlined />,
        label: '退出登录',
        onClick: handleLogout,
      },
    ],
  };

  return (
    <div className="flex items-center justify-between">
      {/* Logo */}
      <NavLink to={ROUTES.HOME} className="flex items-center gap-2 text-white font-bold text-xl hover:scale-105 transition-transform">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl">
          🌳
        </div>
        <span className="hidden sm:inline">心灵树洞</span>
      </NavLink>

      {/* 导航链接 */}
      <nav className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition-all ${
                isActive
                  ? 'bg-white text-primary'
                  : 'text-white hover:bg-white/20'
              }`
            }
            end={item.path === ROUTES.HOME}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* 用户菜单 */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <Dropdown menu={dropdownItems} placement="bottomRight">
            <Avatar
              size={40}
              className="bg-white cursor-pointer hover:scale-110 transition-transform"
              icon={<UserOutlined />}
              src={user?.avatar}
            />
          </Dropdown>
        ) : (
          <Button
            type="default"
            className="bg-white/20 border-white text-white hover:bg-white/30"
            icon={<LoginOutlined />}
            onClick={() => onOpenAuth('login')}
          >
            登录
          </Button>
        )}
      </div>
    </div>
  );
}
