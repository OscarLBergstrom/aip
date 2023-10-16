import { Request, Response } from "express";

export const searchResponse = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;
    const track = req.query.track as string;
    const artist = req.query.artist as string;

    // Check for missing parameters
    if (!token || !track || !artist) {
      res
        .status(400)
        .json({ error: "Bad request: Missing parameters." });
      return;
    }

    const encodedTrack = encodeURIComponent(encodeURIComponent(track));
    const encodedArtist = encodeURIComponent(encodeURIComponent(artist));

    const apiUrl = `https://api.spotify.com/v1/search?q=remaster%2520track%3A${encodedTrack}%2520artist%3A${encodedArtist}&type=track`;

    const result = await fetch(apiUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const search = await result.json();

    res
      .status(200)
      .json({ search });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
