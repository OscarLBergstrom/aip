import { Request, Response } from "express";
import pool from "../../db-config"
import { ResultSetHeader } from "mysql2";

export const insertPlaylist = async (req: Request, res: Response) => {
    try{
    // Recieve User_ID in request

    var playlistid: string = req.body.playlistid;
    var userid: string = req.body.userid;

    // Check for missing parameters
    if (!playlistid || !userid) {
        res
            .status(400)
            .json({ error: "Bad request: Missing parameters." });
        return;
    }
    
    var sql = "INSERT INTO haip.playlists (USER_ID, PLAYLIST_ID) VALUES (?, ?)";
    pool.query(sql, [userid, playlistid], (err: Error | null, queryRes:ResultSetHeader) => {
        if(err === null) {
            res
                .status(200)
                .json({ response: queryRes });
        } else {
            console.error("SQL error:", err);
            res
                .status(500)
                .json({ error: err });
        }
    });

      } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
};