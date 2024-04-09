import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if (
  typeof process.env.MONGO_URI != typeof "" &&
  typeof process.env.MONGO_URI_ACCOUNTING != typeof ""
) {
  console.error(`uri is not string`);
  process.exit(1);
}

const dbInventory = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
dbInventory.on("error", console.error.bind(console, "Connection error:"));
dbInventory.once("open", () => {
  console.log("Connected to Inventory database");
});

const dbAccounting = mongoose.createConnection(
  process.env.MONGO_URI_ACCOUNTING,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
dbAccounting.on("error", console.error.bind(console, "Connection error:"));
dbAccounting.once("open", () => {
  console.log("Connected to Accounting database");
});

export { dbInventory, dbAccounting };
