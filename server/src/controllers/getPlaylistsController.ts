import { Request, Response } from "express";


export const getPlaylistsResponse = async (req: Request, res: Response) => {
  try { 
    const token = req.query.token as string;
    const userID = req.query.userID as string;

    const result = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await result.json();

    res.json({
      playlists: data,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};