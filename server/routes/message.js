import express from "express";
import {getMessages, createMessage,markAsRead} from "../controllers/messages.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/projects/:projectId/messages', verifyToken, createMessage);
router.get('/projects/:projectId/messages', verifyToken, getMessages);
router.put('/messages/:id/mark-as-read', verifyToken, markAsRead);

export default router;