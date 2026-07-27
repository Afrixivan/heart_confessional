import { CRISIS_RESOURCES } from '../../constants';

export default function AppFooter() {
  return (
    <footer className="text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">关于我们</h4>
            <p className="text-white/70 text-sm leading-relaxed">
              心灵树洞是专注于大学生心理健康的智能陪伴平台，为18-25岁在校大学生提供专业、温暖、有效的心理健康支持。
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/" className="hover:text-white transition-colors">首页</a></li>
              <li><a href="/chat" className="hover:text-white transition-colors">对话陪伴</a></li>
              <li><a href="/emotion" className="hover:text-white transition-colors">情绪分析</a></li>
              <li><a href="/knowledge" className="hover:text-white transition-colors">心理知识</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">帮助与支持</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">使用指南</a></li>
              <li><a href="#" className="hover:text-white transition-colors">常见问题</a></li>
              <li><a href="#" className="hover:text-white transition-colors">联系我们</a></li>
              <li><a href="#" className="hover:text-white transition-colors">心理援助热线</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">法律条款</h4>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
              <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
              <li><a href="#" className="hover:text-white transition-colors">免责声明</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-white/50 text-sm">
          <p>© 2026 心灵树洞. All rights reserved. | 全国24小时心理援助热线：{CRISIS_RESOURCES.HOTLINE}</p>
        </div>
      </div>
    </footer>
  );
}
