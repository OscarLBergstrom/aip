import express, { Request, Response } from "express";
import dotenv from "dotenv";
const cors = require("cors"); // TODO: av oklar anledning funkade inte import cors from "cors" för mig
import router from "./router";
const listEndpoints = require('express-list-endpoints')

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config({ path: "./src/.env" });

const port = process.env.PORT;

app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  res.json({
    server: "Express + Typescript server",
    endpoints: listEndpoints(router)
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
