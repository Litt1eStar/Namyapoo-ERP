import mongoose from 'mongoose'
import { dbAccounting } from '../../../db.js'

const schema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    total_value: {
        type: Number,
        required: true,
    },
    total_margin: {
        type: Number,
        required: true
    },
    total_profit:{
        type: Number,
        required: true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, { timestamps: true});

export const Accounting = dbAccounting.model('Accounting', schema);