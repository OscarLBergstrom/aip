import { Router } from "express";
import { createChatResponse } from "../controllers/chatController";
import { authResponse } from "../controllers/authController";
import { tokenResponse } from "../controllers/accessTokenController";
import { profileResponse } from "../controllers/profileController";
import { searchResponse } from "../controllers/searchController";
import { createPlaylistResponse} from "../controllers/createPlaylistController";
import { addTracksResponse } from "../controllers/addTracksController";
import { getPlaylistsResponse } from "../controllers/getPlaylistsController";
import { checkUserID } from "../controllers/userIdController";
import { insertPlaylist } from "../controllers/setDatabasePlaylist";
import { getplaylists } from "../controllers/getPlaylistsDBController";

const router = Router();

router.get("/api/getplaylists", getPlaylistsResponse);

router.post("/api/chatbot", createChatResponse);

router.get("/api/login", authResponse);

router.post("/api/token", tokenResponse);

router.get("/api/profile", profileResponse);

router.get("/api/search", searchResponse);

router.post("/api/playlist", createPlaylistResponse);

router.post("/api/tracks", addTracksResponse);

router.post("/db/checkuserid", checkUserID);

router.post("/db/insertplaylist", insertPlaylist);

router.post("/db/getplaylists", getplaylists)

export default router;
