import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    status:{
        type: Boolean,
        required: true,
        default: false
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {timestamps: true});

const Workspace = mongoose.model("Workspace", schema);

export default Workspace;