import { Request, Response } from "express";
import pool from "../../db-config"
import { PlaylistDB } from "../utils/types";

export const getplaylists = async (req: Request, res: Response) => {
    try{
    // Recieve User_ID in request

    var userid: string = req.body.userid;

    // Check for missing parameters
    if (!userid) {
        res
            .status(400)
            .json({ error: "Bad request: Missing parameters." });
        return;
    }
    
    var sql = "SELECT PLAYLIST_ID FROM haip.playlists WHERE USER_ID = ?";
    pool.query(sql, userid, (err: Error | null, queryRes:PlaylistDB[]) => {
        if(err === null){
            res
                .status(200)
                .json({ queryRes: queryRes });
        } else {
            console.error("SQL error", err);
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