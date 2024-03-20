import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectToDb } from "./connectToDb.js";
import authRoute from './src/routers/auth.route.js'
import workspaceRoute from './src/routers/workspace.route.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(`/api/auth`, authRoute)
app.use(`/api/workspace`, workspaceRoute)

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`Connected to Port ${process.env.PORT}`);
});
