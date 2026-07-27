import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import conversationRoutes from './routes/conversationRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);

app.get('/api/health', (_req, res) => {
  res.json({ success: true, message: '服务正常', data: null });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});