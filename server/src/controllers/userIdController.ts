import { Request, Response } from "express";
import pool from "../../db-config"

export const getUserIDResponse = async (req: Request, res: Response) => {
    //TODO: Recieve User_ID in request

    //TODO: Check if the USER_ID exists

    //TODO: Add the USER_ID to the database
    
    //TODO: Send response with success or error
  
    try { 
        pool.query(`SELECT USER_ID FROM haip.users`, (err:any, queryRes:any)=>{
        console.log(queryRes);
        res.json({
          data: queryRes,
        });
    })
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
};