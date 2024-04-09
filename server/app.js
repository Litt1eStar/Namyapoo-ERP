import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";

import authRoute from "./src/routers/auth.route.js";
import workspaceRoute from "./src/routers/workspace.route.js";
import productRoute from "./src/routers/product.route.js";
import orderRoute from "./src/routers/order.route.js";
import transactionRoute from "./src/routers/transaction.route.js";
import userRoute from "./src/routers/user.route.js";
import stockHistoryRoute from "./src/routers/stockHistrory.route.js";


dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.static(path.join(__dirname, "/client/dist")));
app.use(cookieParser());

app.use(`/api/auth`, authRoute);
app.use(`/api/workspace`, workspaceRoute);
app.use(`/api/product`, productRoute);
app.use(`/api/order`, orderRoute);
app.use(`/api/transaction`, transactionRoute);
app.use(`/api/user`, userRoute);
app.use(`/api/stock-history`, stockHistoryRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log(`Connected to Port ${process.env.PORT}`);
});
