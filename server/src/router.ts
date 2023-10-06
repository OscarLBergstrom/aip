import { Router } from "express";
import { createChatResponse } from "./controllers/chatController";
import { authResponse } from "./controllers/authController";
import { tokenResponse } from "./controllers/accessTokenController";
import { profileResponse } from "./controllers/profileController";
import { searchResponse } from "./controllers/searchController";
import { createPlaylistResponse } from "./controllers/createPlaylistController";
import { addTracksResponse } from "./controllers/addTracksController";
import { getPlaylistsResponse } from "./controllers/getPlaylistsController";
import { userId } from "./controllers/userIdController";

const router = Router();

router.post("/api/chatbot", createChatResponse);

router.get("/api/login", authResponse);

router.post("/api/token", tokenResponse);

router.get("/api/profile", profileResponse);

router.get("/api/search", searchResponse);

router.post("/api/playlist", createPlaylistResponse);

router.post("/api/tracks", addTracksResponse);

router.get("/api/getplaylists", getPlaylistsResponse);

router.get("/api/userid", userId);

export default router;
