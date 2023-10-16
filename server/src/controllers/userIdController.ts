import { Request, Response } from "express";
import pool from "../../db-config"
import { UserDB } from "../utils/types"; 
import { ResultSetHeader} from "mysql2";

export const checkUserID = async (req: Request, res: Response) => {
  // Recieve User_ID in request

    var userid: string = req.body.userid;

    // Check for missing parameters
    if (!userid) {
      res
        .status(400)
        .json({ error: "Bad request: Missing parameters." });
      return;
    }
    
    try {      
      
      //Check if the USER_ID exists
      var sql = "SELECT USER_ID FROM haip.users WHERE USER_ID = ?";
      pool.query(sql, userid, (err: Error | null, queryRes: UserDB[]) => {
        
        try{
          if(queryRes[0].USER_ID === userid) {
            res
              .status(200)
              .json({ userid: queryRes[0].USER_ID });
          }
        } catch(error) {
          
          // If the user does not exists add the USER_ID to the database
          
          var sql = "INSERT INTO haip.users (USER_ID) VALUES (?);"
          pool.query(sql, userid, (err: Error | null, queryRes: ResultSetHeader) => {
            if(err === null) {
              res
                .status(200)
                .json({ success: queryRes });
            } else {
              console.error("SQL error:", err);
              res
                .status(500)
                .json({ error: err })
            }
          });
        }
      });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
};
