import { Router, Request, Response } from 'express';
import { createUser, getUserByEmail } from '../data/memoryStore';
import { generateToken } from '../utils/jwt';
import type { LoginRequest, RegisterRequest } from '../types';

const router = Router();

router.post('/register', (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  const { email, password, nickname } = req.body;
  
  if (!email || !password || !nickname) {
    res.status(400).json({ success: false, message: '请填写完整信息', data: null });
    return;
  }
  
  if (getUserByEmail(email)) {
    res.status(400).json({ success: false, message: '邮箱已被注册', data: null });
    return;
  }
  
  const user = createUser(email, nickname, password, false);
  const token = generateToken(user.id, false);
  
  res.status(200).json({
    success: true,
    message: '注册成功',
    data: {
      user_id: user.id,
      nickname: user.nickname,
      token,
    },
  });
});

router.post('/login', (req: Request<{}, {}, LoginRequest>, res: Response) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    res.status(400).json({ success: false, message: '请填写邮箱和密码', data: null });
    return;
  }
  
  const user = getUserByEmail(email);
  
  if (!user || user.password !== password) {
    res.status(401).json({ success: false, message: '邮箱或密码错误', data: null });
    return;
  }
  
  const token = generateToken(user.id, false);
  
  res.status(200).json({
    success: true,
    message: '登录成功',
    data: {
      user_id: user.id,
      nickname: user.nickname,
      token,
    },
  });
});

router.post('/anonymous', (_req: Request, res: Response) => {
  const nickname = `用户${Math.random().toString(36).substr(2, 6)}`;
  const user = createUser(undefined, nickname, undefined, true);
  const token = generateToken(user.id, true);
  
  res.status(200).json({
    success: true,
    message: '匿名登录成功',
    data: {
      user_id: user.id,
      nickname: user.nickname,
      token,
      is_anonymous: true,
    },
  });
});

export default router;