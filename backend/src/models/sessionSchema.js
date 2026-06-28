import mongoose from "mongoose";

const sessionSchema = ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "notesUser",
        required: true
    },
    accessToken: {
        type: String,
        default: null
    },
    refreshToken: {
        type: String,
        default: null
    },
    isIssuedAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("noteSesion", sessionSchema)