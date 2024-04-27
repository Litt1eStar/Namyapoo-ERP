import mongoose from "mongoose";
import { dbAccounting } from "../../../db.js";

const schema = new mongoose.Schema({
    ref_user_id : {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamp: true})

export const User = dbAccounting.model("User", schema)