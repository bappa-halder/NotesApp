import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    loggedIn: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: null
    }
}, { timestamps: true })

export default mongoose.model("notesUser", userSchema)