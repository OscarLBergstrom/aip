import { Router } from 'express';
import { createChatResponse } from '../controllers/chatController';

const router = Router();

// Map the route to the controller method
router.post('/api/chatbot', createChatResponse);

export default router;