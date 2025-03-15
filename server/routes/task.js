import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByProjectId,
  getTasksByAssignee,
  getTasksByAssigneeAndProject,
  findFirstAndLastTask,
  updateTaskStatus,
  likeTask,
} from '../controllers/tasks.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a task
router.post('/', verifyToken, createTask);

router.get('/', verifyToken, getTasks);
router.get('/:id', verifyToken, getTaskById);
router.get('/:assigneeId/find', verifyToken, getTasksByAssignee);
router.get('/:assigneeId/:projectId/find', verifyToken, getTasksByAssigneeAndProject);
router.get('/projects/:projectId/tasks', verifyToken, getTasksByProjectId);
router.get('/projects/:projectId/findfirstandlast', verifyToken, findFirstAndLastTask);

// Update a task
router.patch('/:id', verifyToken, updateTask);
router.put('/:taskId/updateStatus', verifyToken, updateTaskStatus);
router.put('/:taskId/like', verifyToken, likeTask);

// Delete a task
router.delete('/:id', verifyToken, deleteTask);

export default router;