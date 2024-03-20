import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import { connectToDb } from "./connectToDb.js";
import authRoute from './src/routers/auth.route.js'
import workspaceRoute from './src/routers/workspace.route.js'
import productRoute from './src/routers/product.route.js'
import orderRoute from './src/routers/order.route.js'
import transactionRoute from './src/routers/transaction.route.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(`/api/auth`, authRoute)
app.use(`/api/workspace`, workspaceRoute)
app.use(`/api/product`, productRoute)
app.use(`/api/order`, orderRoute)
app.use(`/api/transaction`, transactionRoute)

app.listen(process.env.PORT, () => {
  connectToDb();
  console.log(`Connected to Port ${process.env.PORT}`);
});
