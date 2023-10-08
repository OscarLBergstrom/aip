import { Request, Response } from "express";
//import pool from "../../db-config"

export const newName = async (req: Request, res: Response) => {
    console.log("USER ID ENTERED HERE 100%");
    try { 
        console.log("HEJEHJEHEJHEJHE");
        //const results = pool.query("SELECT USER_ID FROM haip.users LIMIT 1;");
        const results = "hi"
        console.log(results);
        res.json({
            table: results,
        });
    } catch (error) {
      console.error("Error:", error);
      res
        .status(500)
        .json({ error: "An error occurred while processing the request." });
    }
  };