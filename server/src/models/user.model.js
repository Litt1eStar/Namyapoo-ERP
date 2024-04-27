import mongoose from "mongoose";
import { dbInventory } from "../../db.js";

const schema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamp: true})

const User = dbInventory.model("User", schema)

export default User;