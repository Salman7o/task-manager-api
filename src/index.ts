import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import taskRoutes from './routes/task.routes';
import { notFound, errorHandler } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/', (_req, res) => {
  res.json({ success: true, message: 'Task Manager API is running 🚀' });
});

// Routes
app.use('/api/tasks', taskRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;
