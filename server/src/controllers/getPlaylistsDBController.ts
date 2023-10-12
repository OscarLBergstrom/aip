import { Request, Response } from "express";
import pool from "../../db-config"

export const getplaylists = async (req: Request, res: Response) => {
    try{
    // Recieve User_ID in request

    var userid: string = req.body.userid;
    
    var sql = "SELECT PLAYLIST_ID FROM haip.playlists WHERE USER_ID = ?";
    pool.query(sql, userid, (err:any, queryRes:any)=>{
        console.log("queryRes: " + queryRes);
        console.log("err: " + err);
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