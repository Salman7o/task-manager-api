import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskDTO, UpdateTaskDTO, ApiResponse } from '../models/task.model';

// In-memory store (swap with a DB adapter if needed)
let tasks: Task[] = [];

const now = () => new Date().toISOString();

export const getAllTasks = (req: Request, res: Response): void => {
  const { status, priority } = req.query;

  let filtered = [...tasks];
  if (status) filtered = filtered.filter(t => t.status === status);
  if (priority) filtered = filtered.filter(t => t.priority === priority);

  const response: ApiResponse<Task[]> = { success: true, data: filtered };
  res.json(response);
};

export const getTaskById = (req: Request, res: Response): void => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    res.status(404).json({ success: false, error: 'Task not found' });
    return;
  }
  res.json({ success: true, data: task });
};

export const createTask = (req: Request, res: Response): void => {
  const body: CreateTaskDTO = req.body;

  if (!body.title || body.title.trim() === '') {
    res.status(400).json({ success: false, error: 'Title is required' });
    return;
  }

  const task: Task = {
    id: uuidv4(),
    title: body.title.trim(),
    description: body.description,
    priority: body.priority ?? 'medium',
    status: 'todo',
    dueDate: body.dueDate,
    createdAt: now(),
    updatedAt: now(),
  };

  tasks.push(task);
  res.status(201).json({ success: true, data: task, message: 'Task created' });
};

export const updateTask = (req: Request, res: Response): void => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Task not found' });
    return;
  }

  const updates: UpdateTaskDTO = req.body;
  tasks[index] = { ...tasks[index], ...updates, updatedAt: now() };
  res.json({ success: true, data: tasks[index], message: 'Task updated' });
};

export const deleteTask = (req: Request, res: Response): void => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Task not found' });
    return;
  }
  tasks.splice(index, 1);
  res.json({ success: true, message: 'Task deleted' });
};

export const getStats = (_req: Request, res: Response): void => {
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
  };
  res.json({ success: true, data: stats });
};
