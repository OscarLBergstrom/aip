import { Request, Response } from "express";
import pool from "../../db-config"
import { ResultSetHeader } from "mysql2";

export const insertPlaylist = async (req: Request, res: Response) => {
    try{
    // Recieve User_ID in request

    var playlistid: string = req.body.playlistid;
    var userid: string = req.body.userid;
    
    var sql = "INSERT INTO haip.playlists (USER_ID, PLAYLIST_ID) VALUES (?, ?)";
    pool.query(sql, [userid, playlistid], (err:Error | null, queryRes:ResultSetHeader)=>{
        res.json({
            response: queryRes,
        });
    });

      } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
};