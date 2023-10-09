import { Request, Response } from "express";
import pool from "../../db-config"

export const checkUserID = async (req: Request, res: Response) => {
    
    // Recieve User_ID in request

    var userid: string = req.body.userid;
    
    try{      
      
        //Check if the USER_ID exists
        var sql = "SELECT USER_ID FROM haip.users WHERE USER_ID = ?";
        pool.query(sql, userid, (err:any, queryRes:any)=>{
          console.log(queryRes);
          
          try{
            if(queryRes[0].USER_ID === userid){
              return res.json({
                userid: queryRes[0].USER_ID,
              });
            }
          } catch(error){
            
            // If the user does not exists add the USER_ID to the database
            
            var sql = "INSERT INTO haip.users (USER_ID) VALUES (?);"
            pool.query(sql, userid, (err:any, queryRes:any)=>{
              
              if(err === null){
                return res.json({
                    success: queryRes,
                  });
                }

              else{
                res.status(500).json({error: err}) //Handle error response
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