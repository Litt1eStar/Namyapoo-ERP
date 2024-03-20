import mongoose from "mongoose";

export const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log(`Successfully Connected to Database`);
    })
    .catch(() => {
      console.log(`Failed Connected to Database`);
    });
};
