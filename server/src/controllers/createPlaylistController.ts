import { Request, Response } from "express";

export const createPlaylistResponse = async (req: Request, res: Response) => {
  try {

    const token = req.body.token;
    const userID = req.body.userID;
    const name = req.body.playlistName;

    const result = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ name: name }),
    });

    const data = await result.json();

    res.json({
      token: data,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
