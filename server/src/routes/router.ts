import { Router } from "express";
import { createChatResponse } from "../controllers/chatController";
import { authResponse } from "../controllers/authController";
import { tokenResponse } from "../controllers/accessTokenController";
import { profileResponse } from "../controllers/profileController";
import { searchResponse } from "../controllers/searchController";

const router = Router();

router.post("/api/chatbot", createChatResponse);

router.get("/api/login", authResponse);

router.post("/api/token", tokenResponse);

router.get("/api/profile", profileResponse);

router.get("/api/search", searchResponse);

export default router;
