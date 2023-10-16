import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const clientId = process.env.CLIENT_ID_DEPLOY || process.env.CLIENT_ID;

if (!clientId) {
    throw new Error("CLIENT_ID is not defined in the environment.");
}

export const authResponse = async (req: Request, res: Response) => {
  try {

    const challenge = req.query.challenge as string;

    // Check for missing parameters
    if (!challenge) {
      res
        .status(400)
        .json({ error: "Bad request: Missing parameters." });
      return;
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", (process.env.REDIRECT_URI || "http://localhost:3000/loading"));
    params.append("scope", "user-read-private user-read-email playlist-modify-private playlist-modify-public playlist-read-collaborative playlist-read-private");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    res
      .status(200)
      .json({ urlResponse: `https://accounts.spotify.com/authorize?${params.toString()}` });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
