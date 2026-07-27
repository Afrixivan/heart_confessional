import { Modal, Form, Input, Button, Tabs, message } from 'antd';
import { MailOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setCredentials, setAuthLoading, setAuthError } from '../../store/slices/authSlice';
import { login, register, anonymousLogin } from '../../services/authService';
import type { AuthModalProps } from '../../types';

export default function AuthModal({ open, mode, onClose, onSwitchMode }: AuthModalProps) {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    dispatch(setAuthLoading(true));
    try {
      const response = await login(values);
      if (response.success && response.data) {
        dispatch(
          setCredentials({
            user: {
              user_id: response.data.user_id,
              nickname: response.data.nickname,
              avatar: '',
              email: values.email,
              is_anonymous: false,
            },
            token: response.data.token,
          })
        );
        message.success('登录成功');
        onClose();
      } else {
        dispatch(setAuthError(response.message));
        message.error(response.message || '登录失败');
      }
    } catch (error) {
      const errMsg = (error as { message?: string })?.message || '登录失败，请稍后重试';
      dispatch(setAuthError(errMsg));
      message.error(errMsg);
    } finally {
      setLoading(false);
      dispatch(setAuthLoading(false));
    }
  };

  const handleRegister = async (values: {
    email: string;
    password: string;
    nickname: string;
  }) => {
    setLoading(true);
    dispatch(setAuthLoading(true));
    try {
      const response = await register(values);
      if (response.success && response.data) {
        dispatch(
          setCredentials({
            user: {
              user_id: response.data.user_id,
              nickname: response.data.nickname || values.nickname,
              avatar: '',
              email: values.email,
              is_anonymous: false,
            },
            token: response.data.token,
          })
        );
        message.success('注册成功');
        onClose();
      } else {
        dispatch(setAuthError(response.message));
        message.error(response.message || '注册失败');
      }
    } catch (error) {
      const errMsg = (error as { message?: string })?.message || '注册失败，请稍后重试';
      dispatch(setAuthError(errMsg));
      message.error(errMsg);
    } finally {
      setLoading(false);
      dispatch(setAuthLoading(false));
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    try {
      const response = await anonymousLogin();
      if (response.success && response.data) {
        dispatch(
          setCredentials({
            user: {
              user_id: response.data.user_id,
              nickname: '匿名用户',
              avatar: '',
              email: '',
              is_anonymous: true,
            },
            token: response.data.token,
          })
        );
        message.success('已进入匿名模式');
        onClose();
      }
    } catch (error) {
      message.error('匿名登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={420}
      centered
      destroyOnHidden
    >
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-3 gradient-primary rounded-full flex items-center justify-center text-3xl">
          🌳
        </div>
        <h2 className="text-2xl font-bold text-text-primary">心灵树洞</h2>
        <p className="text-text-secondary text-sm mt-1">温暖陪伴，倾听你的心声</p>
      </div>

      <Tabs
        activeKey={mode}
        onChange={(key) => onSwitchMode(key as 'login' | 'register')}
        centered
        items={[
          {
            key: 'login',
            label: '登录',
            children: (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleLogin}
                requiredMark={false}
              >
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="请输入邮箱"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[{ required: true, message: '请输入密码' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="请输入密码"
                    size="large"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    className="!bg-primary !border-primary hover:!bg-primary-dark"
                  >
                    登录
                  </Button>
                </Form.Item>
                <div className="text-center">
                  <Button
                    type="link"
                    onClick={handleAnonymousLogin}
                    className="text-text-secondary"
                  >
                    匿名访问
                  </Button>
                </div>
              </Form>
            ),
          },
          {
            key: 'register',
            label: '注册',
            children: (
              <Form
                form={form}
                layout="vertical"
                onFinish={handleRegister}
                requiredMark={false}
              >
                <Form.Item
                  name="nickname"
                  label="昵称"
                  rules={[{ required: true, message: '请输入昵称' }]}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="请输入昵称"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="邮箱"
                  rules={[
                    { required: true, message: '请输入邮箱' },
                    { type: 'email', message: '请输入有效的邮箱地址' },
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="请输入邮箱"
                    size="large"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="密码"
                  rules={[
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码至少6位' },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="请输入密码"
                    size="large"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={loading}
                    className="!bg-primary !border-primary hover:!bg-primary-dark"
                  >
                    注册
                  </Button>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />
    </Modal>
  );
}
