import { Request, Response } from "express";

export const addTracksResponse = async (req: Request, res: Response) => {
  try {

    console.log("inside add tracks");

    const playlistID = req.body.playlistID;
    const uris = req.body.uris;
    const token = req.body.token;

    console.log("Playlist ID: ", playlistID);
    console.log("Uris: ", uris);
    console.log("token: ", token);

    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ uris: uris }),
    });

    const data = await result.json();

    console.log(data);

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
