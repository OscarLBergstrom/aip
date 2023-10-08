import { Request, Response } from "express";
//import pool from "../../db-config"

export const getUserIDResponse = async (req: Request, res: Response) => {
    try { 
      //const results = pool.query("SELECT USER_ID FROM haip.users LIMIT 1;");
      const data = {userID: "123"};
      res.json({
          table: data,
      });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
};