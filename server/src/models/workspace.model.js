import mongoose from "mongoose";
import { dbInventory } from "../../db.js";

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum: ['done', 'not_done', 'in_progress'],
        default: 'not_done'
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const Workspace = dbInventory.model("Workspace", schema);

export default Workspace;