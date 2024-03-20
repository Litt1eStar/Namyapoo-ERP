import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectToDb } from "./connectToDb.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`Connected to Port ${process.env.PORT}`);
});
