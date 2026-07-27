import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="抱歉，您访问的页面不存在。"
        extra={
          <Button
            type="primary"
            className="!bg-primary !border-primary"
            onClick={() => navigate(ROUTES.HOME)}
          >
            返回首页
          </Button>
        }
      />
    </div>
  );
}
