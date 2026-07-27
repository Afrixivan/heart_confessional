import { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Card } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined } from '@ant-design/icons';

type BreathPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

const phaseConfig: Record<Exclude<BreathPhase, 'idle'>, { duration: number; label: string; instruction: string }> = {
  inhale: { duration: 4000, label: '吸气', instruction: '用鼻子深吸气，感受腹部鼓起...' },
  hold: { duration: 7000, label: '屏息', instruction: '屏住呼吸，保持感受...' },
  exhale: { duration: 8000, label: '呼气', instruction: '用嘴巴慢慢呼气，发出"嘶"的声音...' },
};

const phaseOrder: Exclude<BreathPhase, 'idle'>[] = ['inhale', 'hold', 'exhale'];

export default function BreathingPage() {
  const [phase, setPhase] = useState<BreathPhase>('idle');
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const runNextPhase = useCallback((currentPhase: Exclude<BreathPhase, 'idle'>) => {
    const config = phaseConfig[currentPhase];
    setPhase(currentPhase);

    timerRef.current = setTimeout(() => {
      const currentIdx = phaseOrder.indexOf(currentPhase);
      const nextIdx = (currentIdx + 1) % phaseOrder.length;

      if (nextIdx === 0) {
        // 完成一轮
        setCycleCount((prev) => prev + 1);
      }

      runNextPhase(phaseOrder[nextIdx]);
    }, config.duration);
  }, []);

  const handleStart = () => {
    setCycleCount(0);
    runNextPhase('inhale');
  };

  const handleStop = () => {
    clearTimer();
    setPhase('idle');
  };

  useEffect(() => {
    return clearTimer;
  }, []);

  const phaseInfo = phase !== 'idle' ? phaseConfig[phase] : null;

  return (
    <div className="py-10 px-4 sm:px-6 page-fade">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">4-7-8呼吸练习</h2>
        <p className="text-text-secondary text-center mb-12">
          通过深呼吸帮助你放松身心，缓解焦虑和压力
        </p>

        {/* 呼吸动画区域 */}
        <div className="text-center mb-12">
          <div className="relative inline-block mb-8">
            <div
              className={`breathing-circle w-52 h-52 rounded-full gradient-primary flex items-center justify-center text-white text-6xl ${
                phase === 'inhale' ? 'inhale' : phase === 'exhale' ? 'exhale' : ''
              }`}
              style={{
                transform: phase === 'inhale' || phase === 'hold' ? 'scale(1.3)' : 'scale(1)',
                transition: `transform ${phaseInfo?.duration || 4000}ms ease-in-out`,
              }}
            >
              🌬️
            </div>
          </div>

          <div className="text-2xl font-semibold mb-2">
            {phase === 'idle' ? '准备开始' : phaseInfo?.label}
          </div>
          <div className="text-text-secondary mb-8">
            {phase === 'idle' ? '点击下方按钮开始练习' : phaseInfo?.instruction}
          </div>

          {cycleCount > 0 && (
            <div className="text-sm text-text-muted mb-4">
              已完成 {cycleCount} 轮练习 🌱
            </div>
          )}

          <div className="flex gap-5 justify-center">
            {phase === 'idle' ? (
              <Button
                type="primary"
                size="large"
                icon={<PlayCircleOutlined />}
                onClick={handleStart}
                className="!bg-primary !border-primary hover:!bg-primary-dark !px-8 !h-12 !text-base"
              >
                开始练习
              </Button>
            ) : (
              <Button
                size="large"
                icon={<PauseCircleOutlined />}
                onClick={handleStop}
                className="!px-8 !h-12 !text-base"
              >
                停止练习
              </Button>
            )}
          </div>
        </div>

        {/* 练习说明 */}
        <Card className="!rounded-lg !border-0 shadow-light" styles={{ body: { padding: '30px' } }}>
          <h4 className="text-lg font-semibold mb-3">💡 什么是4-7-8呼吸法？</h4>
          <p className="text-text-secondary leading-relaxed mb-5">
            4-7-8呼吸法是一种简单有效的放松技巧，由哈佛医学院的安德鲁·韦尔博士推广。它通过特定的呼吸节奏帮助激活身体的放松反应。
          </p>

          <h4 className="text-lg font-semibold mb-3">📋 练习步骤</h4>
          <ul className="text-text-secondary leading-relaxed space-y-2 mb-5">
            <li>
              <strong className="text-primary-dark">吸气（4秒）</strong>：用鼻子深吸气，感受腹部像气球一样鼓起
            </li>
            <li>
              <strong className="text-primary-dark">屏息（7秒）</strong>：屏住呼吸，保持感受
            </li>
            <li>
              <strong className="text-primary-dark">呼气（8秒）</strong>：用嘴巴慢慢呼气，发出"嘶"的声音
            </li>
          </ul>

          <div className="bg-background rounded-md p-4">
            <p className="text-text-secondary leading-relaxed text-sm">
              💡 <strong>小贴士</strong>：建议每天练习2-3次，每次4-6轮。坚持练习可以帮助你在感到焦虑或紧张时快速恢复平静。
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
