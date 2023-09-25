import { Request, Response } from "express";

export const profileResponse = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string;

    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const profile = await result.json();

    res.json({
      profile: profile,
    });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
