import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const clientId = process.env.CLIENT_ID_DEPLOY || process.env.CLIENT_ID;

if (!clientId) {
  throw new Error("CLIENT_ID is not defined in the environment.");
}

export const tokenResponse = async (req: Request, res: Response) => {
  try {
    const code = req.body.code;
    const verifier = req.body.verifier;

    // Check for missing parameters
    if (!code || !verifier) {
      res
        .status(400)
        .json({ error: "Bad request: Missing parameters." });
      return;
    }

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", (process.env.REDIRECT_URI || "http://localhost:3000/loading"));
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    const { access_token } = await result.json();

    res
      .status(200)
      .json({ token: access_token });

  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
