import { Request, Response } from "express";

export const addTracksResponse = async (req: Request, res: Response) => {
  try {

    const playlistID = req.body.playlistID;
    const uris = req.body.uris;
    const token = req.body.token;

    // Check for missing parameters
    if (!playlistID || !uris || !token) {
      res
        .status(400)
        .json({ error: "Bad request: Missing parameters." });
      return;
    }

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ uris: uris }),
    });

    const data = await result.json();

    res
      .status(200)
      .json({ token: data });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
